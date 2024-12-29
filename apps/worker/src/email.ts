// import nodemailer from "nodemailer";

// const transport = nodemailer.createTransport({
//   host: 
//   smtp-relay.brevo.com,
//   port: 587,
//   secure: false, // upgrade later with STARTTLS
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// export async function sendEmail(to: string, body: string) {
//   await transport.sendMail({
//     from: "contact@100xdevs.com",
//     sender: "contact@100xdevs.com",
//     to,
//     subject: "Hello from Zapier",
//     text: body,
//   });
// }
