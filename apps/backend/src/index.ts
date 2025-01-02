import express, { Application, Request, Response } from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";
import { actionRouter } from "./router/actions";
import {OAuth} from "./router/OAuth";
import cors from "cors";
import cookieParser from "cookie-parser";
import { triggerRouter } from "./router/trigger";
const app: Application = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Zapier");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", OAuth);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/actions", actionRouter);
app.use("/api/v1/trigger", triggerRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
  