import { prisma } from "@repo/db-v2/prisma";
import express, { Request, Response } from "express";
import { authMiddleware } from "./middleware";

const app = express.Router();

app.get("/github/callback", authMiddleware, async (req: Request, res: Response) => {
  const { code } = req.query;
//   @ts-ignore
const id  = req.id
  if (!code) {
    res.status(400).send("Authorization code is missing");
    return;
  } 
  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        //getting accesstoken by sending  code
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: "Ov23liEyUark8iVMzES2",
          client_secret: "729778243fbfaa79a42f5546af0a428bbbb9f630",
          code,
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      res.status(400).send(`Error: ${data.error_description}`);
      return;
    }

    const accessToken = data.access_token;
         await prisma.user.update({ //saving access token in db
            where:{
                id:id
            },
            data:{
                githubToken :accessToken
            }
         }) 
    res.redirect(`http://localhost:3000/zap/create`);
      } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).send("Internal Server Error");
  }
});

export const addAppRouter = app;
