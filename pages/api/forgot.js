import client from "../../lib/client";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { email } = req.body;

    // Check user's existence
    const user = await client.user.findFirst({ where: { email } });
    const id = uuidv4();
    if (user) {
      // create a request object with hashed id and user's email

      //   const request = {
      //     email,
      //     id,
      //   };

      //create request in db
      const createRequest = await client.requests.create({
        data: {
          id,
          email,
        },
      });

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport(
        `smtps://${process.env.NODEMAILER_USERNAME}%40abv.bg:${process.env.NODEMAILER_PASS}@smtp.abv.bg`
      );

      // setup e-mail data with unicode symbols
      const mailOptions = {
        from: `"${process.env.NODEMAILER_USERNAME}@abv.bg`, // sender address
        to: email, // list of receivers
        subject: "Password Reset ✔", // Subject line
        text: `To reset your password, please follow the link: https://next-media.vercel.app/reset-password/${id}`, // plaintext body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: " + info.response);
      });

      // send email
      res.send("Email sent.");
      return;
    }
    // else - return error msg
    res.send({ error: "User with that email does not exist." });
  }
  await client.$disconnect();
}
