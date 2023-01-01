import { Types } from "mongoose";
import { getSession } from "next-auth/react";
import View_Credentials from "../../../components/Credentials/view_credentials";
import BadgeModel from "../../../models/badge";
import connectMongo from "../../../utils/connectMongo";
import Educator from "../../../models/educator";

import Recipient from "../../../models/recipient";
import Badge_Educator from "../../../models/badge_educator";

export default function Badge({ credentialData, educatorData, recipientData }) {
  return (
    <div>
      <View_Credentials
        credential={credentialData}
        belongTo={""}
        isUser={false}
        IssuedBy={educatorData}
        CredentialType="badge"
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
    const badgeData = await BadgeModel.findById(id);

    // console.log("FETCHED DOCUMENTS");

    // console.log(badgeData);

    const badgeID = Types.ObjectId(badgeData._id);

    // console.log("111111111111111111111111111111111");
    // const badgeStudent = await Badge_Student.findOne({
    //   badgeID: badgeID,
    // });

    const badgeEducator = await Badge_Educator.findOne({
      badgeID: badgeID,
    });

    // console.log(badgeStudent);

    // const badgeStudentID = Types.ObjectId(badgeStudent.studentID);
    const badgeEducatorID = Types.ObjectId(badgeEducator.educatorID);
    // console.log("2222222222222222222222222222222222");
    // const student = await Student.findById(badgeStudentID);
    const educator = await Educator.findById(badgeEducatorID);
    // console.log("3333333333333333333333333333333333");

    // console.log(student);
    return {
      props: {
        credentialData: JSON.parse(JSON.stringify(badgeData)),
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
