import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { prisma } from "@repo/db-v2/prisma";
import { sendEmail } from "./email";
 
const TOPIC_Name = "zap-events";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.subscribe({ topic: TOPIC_Name, fromBeginning: true });
  const producer = kafka.producer();
  await producer.connect();
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ partition, message }) => {
      if (!message.value?.toString()) {
        return;
      }
      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await prisma.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = zapRunDetails?.zap.actions.find(
        (x: any) => x.sortingOrder === stage
      );
      if (!currentAction) {
        console.log("current action not found");
        return;
      }
      const zapRunMetadata = zapRunDetails?.metadata;

      if (currentAction.type.id === "email") { 
      console.log(currentAction.metadata.body)
        const body = parse(
          (currentAction.metadata as JsonObject)?.body as string, 
          zapRunMetadata
        );
        console.log(body)
        const to = await parse(
          (currentAction.metadata as JsonObject)?.email as string,
          zapRunMetadata
        );
        console.log(`Sending out email to ${to} body is ${body}`);

        // await sendEmail(to, body);
      }
      if (currentAction.type.id === "send-sol") {
        const amount = await  parse(
          (currentAction.metadata as JsonObject)?.amount as string,
          zapRunMetadata
        );
        const address = parse(
          (currentAction.metadata as JsonObject)?.address as string,
          zapRunMetadata
        );
        console.log(`Sending out SOL of ${amount} to address ${address}`);
        // await sendSol(address, amount);
      }

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });

      const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;

      if (lastStage !== stage) {
        producer.send({
          topic: TOPIC_Name,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapRunId: zapRunId,
              }),
            },
          ],
        });
      }

      await consumer.commitOffsets([
        {
          topic: TOPIC_Name,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}
main();
