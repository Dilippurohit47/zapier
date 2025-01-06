import { prisma } from "@repo/db-v2/prisma";
import bcrypt from "bcrypt";
import express from "express";
import { sendEmail } from "../sendMail";
import { resetPasswordSchema, signinSchema, SignupSchema } from "../types";
import { errorResponse, formatZodError, sendToken } from "../utils/helper";
import { authMiddleware } from "./middleware";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
      const error = formatZodError(parsedData?.error?.issues);
      res.status(411).json({
        message: error[0],
      });
      return;
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: parsedData?.data.email,
      },
    });

    if (userExists) {
      res.status(403).json({
        message: "user already exists",
      });
      return;
    }

    const Otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const emailSent = await sendEmail(parsedData.data.email, Otp);
    if (!emailSent) {
      errorResponse(res, 500, "Internal server error");
      return;
    }

    await prisma.user.create({
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: hashedPassword,
        otp: Otp,
        otpExpiry: otpExpiryTime,
      },
    });

    res.json({
      message: "Please veify your account by checking your email ",
    });
  } catch (error) {
    errorResponse(res, 500, "Internal server Error");
  }
});

router.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const parsedData = signinSchema.safeParse(body);
    if (!parsedData.success) {
      const error = formatZodError(parsedData.error.issues);
      res.status(411).json({
        message: error[0],
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });
    if (!user) {
      res.status(403).json({
        message: "Invalid Credentials!",
      });
      return;
    }
    if (!user.verified) {
      res.status(403).json({
        message: "First verify your Email address for login!",
      });
      return;
    }
    const comparePassword = await bcrypt.compare(parsedData.data.password,user?.password );
    if (!comparePassword) {
      res.status(403).json({
        message: "Invalid Credentials!",
      });
      return;
    }

    sendToken(res, user);
    res.json({
      message: "Welcome back",
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal server error");
  }
});

router.get("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  res.json({
    user,
  });
});

// reset-password routes
router.put("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      errorResponse(res, 403, "user not found");
      return;
    }
    const Otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);
    const emailSent = await sendEmail(user?.email, Otp);
    if (!emailSent) {
      errorResponse(res, 500, "Internal server error");
      return;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otpExpiry: otpExpiryTime,
        otp: Otp,
      },
    });

    res.json({
      message: "Check you email for  otp",
    });
  } catch (error) {
    errorResponse(res, 500, "Internal server error");
  }
});

router.put("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      errorResponse(res, 403, "User not found");
      return;
    }

    const currentTime = new Date();
    // @ts-ignore
    if (user.otp !== otp || user.otpExpiry < currentTime) {
      errorResponse(res, 403, "Invalid  OTP");
      return;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otpExpiry: null,
        otp: null,
        verified: true,
      },
    });

    sendToken(res, user);

    res
      .status(200)
      .json({ userId: user.id, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal server error");
  }
});
router.post("/reset-password/:userId/:otp", async (req, res) => {
  try {
    const { userId, otp } = req.params;
    console.log(otp);
    const body = req.body;
    const parseData = resetPasswordSchema.safeParse(body);

    if (!parseData.success) {
      const error = formatZodError(parseData.error.issues);
      const firstError = error[0];
      errorResponse(res, 404, firstError!);
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      errorResponse(res, 404, "User not found");
      return;
    }
    if (user.otp !== otp) {
      errorResponse(res, 403, "Invalid Otp!");
      return;
    }
    const currentTime = new Date();
    // @ts-ignore
    if (user.otpExpiry < currentTime) {
      errorResponse(res, 403, "Otp expired!");
      return;
    }

    const hashedPassword = await bcrypt.hash(parseData.data.newPassword, 10);

    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
      },
    });

    res.json({
      message: "Password reset Successfully",
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal server error");
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("zapier-token", { secure: true, httpOnly: true });
  res.status(200).send({ message: "User logged out" });
});

export const userRouter = router;
