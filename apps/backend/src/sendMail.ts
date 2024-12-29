import nodemailer from "nodemailer";

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

export async function sendEmail(to: string, otp: string) {
  try {
    const body = `Hello,
Your verification code for Zapier is: ${otp}
Please use this code to verify your account. If you did not request this code, please ignore this email.
Thank you,
Zapier Team`;
    await transport.sendMail({
      from: "dilippurohit204@gmail.com",
      to,
      subject: "Verification Code from Zapier",
      text: body,
    });

    return true;
  } catch (error) {
    console.log("Error sending email:", error);
  }
}
