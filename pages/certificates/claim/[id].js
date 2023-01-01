import { Types } from "mongoose";
import { getSession } from "next-auth/react";
import View_Credentials from "../../../components/Credentials/view_credentials";
import CertificateModel from "../../../models/certificate";
import Certificate_Educator from "../../../models/certificate_educator";
// import Certificate_Student from "../../../models/certificate_student";
// import Student from "../../../models/student";
import connectMongo from "../../../utils/connectMongo";
import Educator from "../../../models/educator";

import Recipient from "../../../models/recipient";

export default function Certificate({
  credentialData,
  educatorData,
  recipientData,
}) {
  return (
    <div>
      <View_Credentials
        credential={credentialData}
        belongTo={''}
        isUser={false}
        IssuedBy={educatorData}
        CredentialType="certificate"
        isBelong={true}
        isClaim={true}
        recipient={recipientData}
      />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id, vc } = context.query;

  try {
    // console.log("CONNECTING TO MONGO");
    await connectMongo();
    // console.log("CONNECTED TO MONGO");

    const recipient = await Recipient.findById(vc);

    // console.log("FETCHING DOCUMENTS");
    const Certificate = await CertificateModel.findById(id);

    // console.log("FETCHED DOCUMENTS");

    // console.log(Certificate);

    const certID = Types.ObjectId(Certificate._id);

    // console.log("111111111111111111111111111111111");
    // const certStudent = await Certificate_Student.create({
    //   certificateID: certID,
    // });

    const certEducator = await Certificate_Educator.findOne({
      certificateID: certID,
    });

    // console.log("certStudent");
    // console.log(certStudent);

    // const certStudentID = Types.ObjectId(certStudent.studentID);
    const certEducatorID = Types.ObjectId(certEducator.educatorID);
    // console.log("2222222222222222222222222222222222");
    // const student = await Student.findById(certStudentID);
    const educator = await Educator.findById(certEducatorID);
    // console.log("3333333333333333333333333333333333");

    // console.log(student);
    return {
      props: {
        credentialData: JSON.parse(JSON.stringify(Certificate)),
        // studentData: JSON.parse(JSON.stringify(student)),
        educatorData: JSON.parse(JSON.stringify(educator)),
        recipientData: JSON.parse(JSON.stringify(recipient)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
