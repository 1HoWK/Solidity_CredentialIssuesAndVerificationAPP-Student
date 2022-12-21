import View_Credentials from "../../components/Credentials/view_credentials";
import CertificateModel from "../../models/certificate";
import connectMongo from "../../utils/connectMongo";

import Certificate_Student from "../../models/certificate_student";
import Student from "../../models/student";
import { Types } from "mongoose";

export default function Certificate({ credentialData, student }) {
  return (
    <div>
      <View_Credentials
        credential={credentialData}
        belongTo={student}
        isUser={false}
        CredentialType="certificate"
      />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("FETCHING DOCUMENTS");
    const Certificate = await CertificateModel.findById(id);
    console.log("FETCHED DOCUMENTS");

    const certID = Types.ObjectId(Certificate._id);

    const certStudent = await Certificate_Student.findOne({
      certificateID: certID,
    });

    const certStudentID = Types.ObjectId(certStudent.studentID);

    const student = await Student.findById(certStudentID);

    console.log(student);

    return {
      props: {
        credentialData: JSON.parse(JSON.stringify(Certificate)),
        student: JSON.parse(JSON.stringify(student)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
