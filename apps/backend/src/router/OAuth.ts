import express from "express";
import { google } from "googleapis";
import { prisma } from "@repo/db-v2/prisma";
import { sendToken } from "../utils/helper";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_PASSWORD } from "../config";
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "postmessage"
);

const app = express.Router();
app.post("/google/callback", async (req, res) => {
  try {
    const { credentialResponse } = req.body;
    const code = credentialResponse?.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const userInfoResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const userInfo = await userInfoResponse.json();
    const user = await prisma.user.findFirst({
      where: {
        email: userInfo.email,
      },
    });

    if (user) {
      sendToken(res, user);
      res.status(200).json({ message: "Welcome back" });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        email: userInfo.email,
        name: userInfo.name,
        verified: true,
      },
    });
    sendToken(res, newUser);
    res.status(200).json({ message: "welcome to zapier" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const OAuth = app;
