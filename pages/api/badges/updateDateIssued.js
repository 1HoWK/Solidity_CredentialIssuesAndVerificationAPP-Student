import connectMongo from "../../../utils/connectMongo";
import Certificate from "../../../models/certificate";
import Certificate_Student from "../../../models/certificate_student";
import { Types } from "mongoose";
import Certificate_Educator from "../../../models/certificate_educator";
import { getSession, useSession } from "next-auth/react";
import Educator from "../../../models/educator";
import { hashPassword } from "../../../utils/auth";
import Student from "../../../models/student";
import Badge from "../../../models/badge";

export default async function resetPWD(req, res) {
  try {
    console.log("CONNECTING TO MONGO");

    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');
    const badgeRecieved = req.body.badge;
    const dateIssuedRecieved = req.body.dateIssued;

    console.log(badgeRecieved);
    console.log(dateIssuedRecieved);

    const verifiedBadge = await Badge.findById(badgeRecieved._id);

    console.log(verifiedBadge);

    if (verifiedBadge) {
      const updatedBadge = await Badge.findByIdAndUpdate(verifiedBadge._id, {
        dateIssued: dateIssuedRecieved,
      });

      console.log(updatedBadge);

      console.log("updated date issued");
    } else {
      res.status(422).json({
        message: "updated date issued unsuccessfully!",
      });
      return;
    }

    res.status(201).json({ message: "updated date issued successfully!" });
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: "Some error happen",
    });
    return;
  }
}
