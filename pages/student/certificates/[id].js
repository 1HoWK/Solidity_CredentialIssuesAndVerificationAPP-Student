import { Types } from "mongoose";
import View_Credentials from "../../../components/Credentials/view_credentials";
import CertificateModel from "../../../models/certificate";
import Certificate_Student from "../../../models/certificate_student";
import Student from "../../../models/student";
import connectMongo from "../../../utils/connectMongo";

export default function Certificate({ credentialData, student }) {
  return (
    <div>
      <View_Credentials
        credential={credentialData}
        belongTo={student}
        isUser={true}
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

    console.log(Certificate);

    const certID = Types.ObjectId(Certificate._id);

    console.log("111111111111111111111111111111111");
    const certStudent = await Certificate_Student.findOne({
      certificateID: certID,
    });

    console.log(certStudent);

    const certStudentID = Types.ObjectId(certStudent.studentID);

    console.log("2222222222222222222222222222222222");
    const student = await Student.findById(certStudentID);
    console.log("3333333333333333333333333333333333");

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
