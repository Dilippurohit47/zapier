import { Kafka } from "kafkajs";
import {prisma} from "@repo/db-v2/prisma"


const TOPIC_Name = "zap-events";
const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer =  kafka.producer();
  await producer.connect();
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  while (true) {
    const pendingRow = await prisma.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });
    if (pendingRow.length === 0) {
      await sleep(1000);
      continue;
    }
    producer.send({
      topic: TOPIC_Name,
      messages: pendingRow.map((r:any) => {
        return { value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }) };
      }),
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRow.map((r:any) => r.id),
        },
      },
    });
  }
}

main();
