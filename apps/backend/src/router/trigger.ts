import express from "express";
import {prisma} from "@repo/db-v2/prisma"


const router = express.Router();

router.get("/available", async (req, res) => {
  const availableTriggers = await prisma.availableTrigger.findMany();

  res.json({
    availableTriggers,
  });
});

export const triggerRouter = router;
