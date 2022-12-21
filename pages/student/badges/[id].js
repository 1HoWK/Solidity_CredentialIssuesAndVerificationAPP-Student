import View_Credentials from "../../../components/Credentials/view_credentials";
import BadgeModel from "../../../models/badge";
import connectMongo from "../../../utils/connectMongo";

import Badge_Student from "../../../models/badge_student";
import Student from "../../../models/student";
import { Types } from "mongoose";

export default function Badge({ credentialData, student }) {
  return (
    <div>
      <View_Credentials
        credential={credentialData}
        belongTo={student}
        isUser={true}
        CredentialType="badge"
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
    const Badge = await BadgeModel.findById(id);
    console.log("FETCHED DOCUMENTS");

    const badgeID = Types.ObjectId(Badge._id);

    const badgeStudent = await Badge_Student.findOne({
      badgeID: badgeID,
    });

    const badgeStudentID = Types.ObjectId(badgeStudent.studentID);

    const student = await Student.findById(badgeStudentID);

    console.log(student);

    return {
      props: {
        credentialData: JSON.parse(JSON.stringify(Badge)),
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
