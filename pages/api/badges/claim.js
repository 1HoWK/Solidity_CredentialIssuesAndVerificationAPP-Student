import connectMongo from "../../../utils/connectMongo";
import Student from "../../../models/student";
import Recipient from "../../../models/recipient";
import Badge from "../../../models/badge";
import Badge_Student from "../../../models/badge_student";

export default async function resetPWD(req, res) {
  try {
    // console.log("CONNECTING TO MONGO");

    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');
    const badgeRecieved = req.body.badge;
    const emailRecieved = req.body.studentEmail;
    const recipientRecieved = req.body.recipient;

    // console.log(badgeRecieved);
    // console.log(emailRecieved);
    // console.log(recipientRecieved);

    const claimed = true;

    const recipient = await Recipient.findByIdAndUpdate(recipientRecieved._id, {
      hasClaimed: claimed,
    });

    // console.log("recipient");
    // console.log(recipient);

    // console.log('badgeRecieved._id');
    // console.log(badgeRecieved._id);
    

    const verifiedBadge = await Badge.findById(badgeRecieved._id);

    const verifiedStudent = await Student.findOne({ email: emailRecieved });

    // console.log("verifiedBadge");

    // console.log(verifiedBadge);

    // console.log("verifiedStudent");

    // console.log(verifiedStudent);

    if (verifiedStudent && verifiedBadge) {
      // console.log("start here ------------------------------");
      // console.log(badgeRecieved._id);
      // console.log(verifiedStudent._id);

      //create badge student
      const badgeStudent = await Badge_Student.create({
        badgeID: badgeRecieved._id,
        studentID: verifiedStudent._id,
      });

      // console.log("the end");
    } else {
      res.status(422).json({
        message: "claimed the badge unsuccessfully!",
      });
      return;
    }
    // console.log("the end1");
    res.status(201).json({ message: "claimed the badge successfully!" });
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: "Some error happen",
    });
    return;
  }
  return;
}
