import express from "express";
import { prisma } from "@repo/db-v2/prisma";

const router = express.Router();

router.get("/available", async (req, res) => {
  const availableActions = await prisma.availableAction.findMany();

  res.json({
    availableActions,
  });
});

export const actionRouter = router;
