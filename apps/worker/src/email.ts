import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendEmail(to: string, body: string) {
  try {
    await transport.sendMail({
      from: "dilippurohit204@gmail.com",
      to,
      subject: "You received bounty",
      text: body,
    });

    return true;
  } catch (error) {
    console.log("Error sending email:", error);
  }
}
