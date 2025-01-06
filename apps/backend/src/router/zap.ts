import express from "express";
import { authMiddleware } from "./middleware";
import { zapCreateSchema } from "../types";
import { prisma } from "@repo/db-v2/prisma";

import { errorResponse, formatZodError } from "../utils/helper";
const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const id = req.id;
    const body = req.body;
    const parseData = zapCreateSchema.safeParse(body);
    if (!parseData.success) {
      const error = formatZodError(parseData.error.issues);
      console.log(error);
      res.status(411).json({
        message: error[0],
      });
      return;
    }
    await prisma.$transaction(async (tx: any) => {
      const zap = await tx.zap.create({
        data: {
          userId: parseInt(id),
          triggerId: "",
          actions: {
            create: parseData.data.actions.map((x, index) => ({
              actionId: x.availableActionId,
              sortingOrder: index,
              metadata: x.actionMetadata,
            })),
          },
        },
      });

      const trigger = await tx.trigger.create({
        data: {
          triggerId: parseData.data.availableTriggerId,
          zapId: zap.id,
        },
      });

      await tx.zap.update({
        where: {
          id: zap.id,
        },
        data: {
          triggerId: trigger.id,
        },
      });
      return res.json({
        zap: zap.id,
      });
    });
  } catch (error) {
    errorResponse(res, 500, "Internal server error");
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const id = req.id;
    const zap = await prisma.zap.findMany({
      where: {
        userId: id,
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      zap,
    });
    return;
  } catch (error) {
    errorResponse(res, 500, "Internal server error");
  }
});
router.get("/:zapid", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapid;
    const zap = await prisma.zap.findMany({
      where: {
        userId: id,
        id: zapId,
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    res.json({
      zap,
    });
    return;
  } catch (error) {
    errorResponse(res, 500, "Internal server error");
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      errorResponse(res, 404, "Zap not found");
      return;
    }

    const action = await prisma.action.findFirst({
      where:{
        zapId:id
      }
    })
    await prisma.$transaction(async (tx: any) => {
      await tx.trigger.delete({
        where: {
          zapId: id,
        },
      });
      await tx.action.delete({
        where: {
          id: action.id,
        },
      });
      await tx.zap.delete({
        where: {
          id: id,
        },
      });
      res.json({
        message: "Zap deleted Successfully",
      });
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal server error");
  }
});
export const zapRouter = router; 
