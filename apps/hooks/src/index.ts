import express from "express";
import { prisma } from "@repo/db-v2/prisma";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send(
    "Hello from hooks  here we come when any zap get triggered or run !"
  );
});
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const zapId = req.params.zapId;
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    res.status(403).json({
      message: "Please enter all fields",
    });
    return;
  }
  await prisma.$transaction(async (tx: any) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  res.json({
    message: "Zaprun created successfully",
  });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
 