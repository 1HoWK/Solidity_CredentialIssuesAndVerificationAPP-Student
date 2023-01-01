import connectMongo from "../../../utils/connectMongo";
import Badge from "../../../models/Badge";
import Badge_Student from "../../../models/Badge_student";
import { Types } from "mongoose";
import Badge_Educator from "../../../models/Badge_educator";
import { getSession, useSession } from "next-auth/react";
import Educator from "../../../models/educator";
import { hashPassword } from "../../../utils/auth";
import Student from "../../../models/student";

export default async function resetPWD(req, res) {
  try {
    console.log("CONNECTING TO MONGO");

    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');
    const badgeRecieved = req.body.badge;
    const descriptionRecieved = req.body.desc;

    // console.log(badgeRecieved);
    // console.log(descriptionRecieved);

    const verifiedBadge = await Badge.findById(badgeRecieved._id);

    // console.log(verifiedBadge);

    if (verifiedBadge) {
      const updatedBadge = await Badge.findByIdAndUpdate(verifiedBadge._id, {
        desc: descriptionRecieved,
      });

      // console.log(updatedBadge);

      // console.log("updated descrption");
    } else {
      res.status(422).json({
        message: "update descrption unsuccessfully!",
      });
      return;
    }

    res.status(201).json({ message: "update description successfully!" });
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: "Some error happen",
    });
    return;
  }
}
