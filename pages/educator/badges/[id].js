import View_Credentials from "../../../components/Credentials/view_credentials";
import BadgeModel from "../../../models/badge";
import connectMongo from "../../../utils/connectMongo";
import Badge_Educator from "../../../models/badge_educator";
import Educator from "../../../models/educator";
// import Badge_Student from "../../../models/badge_student";
// import Student from "../../../models/student";
import { Types } from "mongoose";
import { getSession } from "next-auth/react";

export default function Badge({ credentialData, educatorData }) {
  return (
    <div>
      <View_Credentials
        credential={credentialData}
        belongTo={''}
        isUser={false}
        IssuedBy={educatorData}
        CredentialType="badge"
        isBelong={false}
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

    // console.log(Badge);

    const badgeID = Types.ObjectId(Badge._id);

    // console.log("Stage 1");

    // const badgeStudent = await Badge_Student.findOne({
    //   badgeID: badgeID,
    // });

    const badgeEducator = await Badge_Educator.findOne({
      badgeID: badgeID,
    });

    // console.log("Stage 2");
    // console.log(badgeStudent)

    // const badgeStudentID = Types.ObjectId(badgeStudent.studentID);
    const badgeEducatorID = Types.ObjectId(badgeEducator.educatorID);

    // const student = await Student.findById(badgeStudentID);
    const educator = await Educator.findById(badgeEducatorID);
    // console.log(student);

    return {
      props: {
        credentialData: JSON.parse(JSON.stringify(Badge)),
        // studentData: JSON.parse(JSON.stringify(student)),
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
