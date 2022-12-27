import connectMongo from "../../../utils/connectMongo";
import Certificate from "../../../models/certificate";
import Certificate_Student from "../../../models/certificate_student";
import Student from "../../../models/student";
import Recipient from "../../../models/recipient";

export default async function resetPWD(req, res) {
  try {
    console.log("CONNECTING TO MONGO");

    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');
    const certificateRecieved = req.body.certificate;
    const emailRecieved = req.body.studentEmail;
    const recipientRecieved = req.body.recipient;

    console.log(certificateRecieved);
    console.log(emailRecieved);
    console.log(recipientRecieved);

    const claimed = true;

    const recipient = await Recipient.findByIdAndUpdate(recipientRecieved._id, {
      hasClaimed: claimed,
    });

    console.log("recipient");
    console.log(recipient);

    const verifiedCertificate = await Certificate.findById(
      certificateRecieved._id
    );

    const verifiedStudent = await Student.findOne({ email: emailRecieved });

    console.log("verifiedCertificate");

    console.log(verifiedCertificate);

    console.log("verifiedStudent");

    console.log(verifiedStudent);

    if (verifiedStudent && verifiedCertificate) {
      console.log("start here ------------------------------");
      console.log(certificateRecieved._id);
      console.log(verifiedStudent._id);

      //create cert student
      const certStudent = await Certificate_Student.create({
        certificateID: certificateRecieved._id,
        studentID: verifiedStudent._id,
      });

      console.log("the end");
    } else {
      res.status(422).json({
        message: "claimed the certificate unsuccessfully!",
      });
      return;
    }
    console.log("the end1");
    res.status(201).json({ message: "claimed the certificate successfully!" });
    console.log("the end3");
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: "Some error happen",
    });
    return;
  }
}
