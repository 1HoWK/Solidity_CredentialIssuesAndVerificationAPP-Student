import connectMongo from "../../../utils/connectMongo";
import Certificate from "../../../models/certificate";
import Certificate_Student from "../../../models/certificate_student";
import { Types } from "mongoose";
import Certificate_Educator from "../../../models/certificate_educator";
import { getSession, useSession } from "next-auth/react";
import Educator from "../../../models/educator";

import nodemailer from "nodemailer";
import Student from "../../../models/student";

const path = require("path");

const dotenv = require("dotenv");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

export default async function resetPWD(req, res) {
  try {
    console.log("CONNECTING TO MONGO");

    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');
    const emailRecieved = req.body.email;

    console.log(emailRecieved);

    const verifiedStudent = await Student.findOne({ email: emailRecieved });

    console.log(verifiedStudent);

    if (verifiedStudent) {
      const generateEmailContent = () => {
        return {
          html: `<!DOCTYPE html>
              <html lang="en">
              <head>
              </head>
              <body>
                <main>
                  <h2>Reset Password</h2>
                  <hr>
                  <p style="margin-top: 15px;margin-bottom: 15px;">Hi ${verifiedStudent.name},</p>
                  <p style="text-align: justify;">A password reset for your account was required</p>
                  <p style="text-align: justify;">Please click the button below to change your password</p>
                  <a " href="http://localhost:3000/student/resetPwd/${verifiedStudent._id}">Please click this link.</a>
                </main>
                <footer>
                  <img style="width:100%;margin-top:20px;" src="https://res.cloudinary.com/dhfvht9ju/image/upload/v1671875905/ppkyn4l4o0vfjeq79opx.png" alt="this is a image on email for credBLOCK">
                </footer>
              </body>
              </html>`,
        };
      };

      await transporter.sendMail({
        from: email,
        to: verifiedStudent.email,
        ...generateEmailContent(),
        subject: "Claim Credential",
      });

      console.log("got email inside");
    } else {
      res.status(201).json({ message: "invalid email!" });
    }

    res.status(201).json({ message: "sent reset password email!" });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
