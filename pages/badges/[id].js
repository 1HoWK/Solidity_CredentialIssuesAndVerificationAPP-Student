import View_Credentials from "../../components/Credentials/view_credentials";
import BadgeModel from "../../models/badge";
import connectMongo from "../../utils/connectMongo";
import Badge_Educator from "../../models/badge_educator";
import Educator from "../../models/educator";
import Badge_Student from "../../models/badge_student";
import Student from "../../models/student";
import { Types } from "mongoose";
import { getSession } from "next-auth/react";

export default function Badge({ credentialData, studentData, educatorData }) {
  return (
    <div>
      <View_Credentials
        credential={credentialData}
        belongTo={studentData}
        isUser={false}
        IssuedBy={educatorData}
        CredentialType="badge"
        isBelong={true}
        isClaim={false}
        recipient={{ hasClaimed: false }}
      />
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    // console.log("CONNECTING TO MONGO");
    await connectMongo();
    // console.log("CONNECTED TO MONGO");

    // console.log("FETCHING DOCUMENTS");
    const Badge = await BadgeModel.findById(id);
    // console.log("FETCHED DOCUMENTS");

    const badgeID = Types.ObjectId(Badge._id);

    const badgeStudent = await Badge_Student.findOne({
      badgeID: badgeID,
    });

    const badgeEducator = await Badge_Educator.findOne({
      badgeID: badgeID,
    });

    const badgeStudentID = Types.ObjectId(badgeStudent.studentID);
    const badgeEducatorID = Types.ObjectId(badgeEducator.educatorID);

    const student = await Student.findById(badgeStudentID);
    const educator = await Educator.findById(badgeEducatorID);
    // console.log(student);

    return {
      props: {
        credentialData: JSON.parse(JSON.stringify(Badge)),
        studentData: JSON.parse(JSON.stringify(student)),
        educatorData: JSON.parse(JSON.stringify(educator)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
