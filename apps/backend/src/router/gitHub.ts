import { prisma } from "@repo/db-v2/prisma";
import axios from "axios";
import express from "express";

// const app =express.Router()

export const createWebhook = async (zapId, id, body) => {
  try {
    const repo = body.triggerMetadata.repo;
    // http://localhost:4000/hooks/catch/1/94f5bc9a-f76a-4641-929d-3b41131da18b

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const url =`https://api.github.com/repos/${repo.owner.login}/${repo.name}/hooks`;

    const data = {
      name: "web",
      active: true,
      events: ["push"],
      config: {
        url: `https://d584-106-215-154-96.ngrok-free.app/hooks/catch/${id}/${zapId}`,
        content_type: "json",
        secret: "password",
      },
    };

    const res = await axios.post(url, data, {
      headers: {
        Authorization: `token ${user.githubToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
// export const GitHubACtions = app
