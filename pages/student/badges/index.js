import AllCredentials from "../../../components/Credentials/all_credentials";
import BadgeModel from "../../../models/badge";
import connectMongo from "../../../utils/connectMongo";
import { getSession, useSession } from "next-auth/react";
import Student from "../../../models/Student";
import Badge_Student from "../../../models/badge_student";
import Script from "next/script";

export default function Credentials({ Badges }) {
  return (
    <div style={{ padding: "3rem 0px" }}>
      <Script
        src="https://widget.Cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      />
      <AllCredentials Credentials={Badges} path="badges" />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/student/login",
        permanent: false,
      },
    };
  }

  console.log(session.user.email);

  try {
    await connectMongo();

    const { _id } = await Student.findOne({ email: session.user.email });

    const certArr = await Badge_Student.find({ studentID: _id });

    const badges = await certArr.map(async (badgeId) => {
      const badge = await BadgeModel.findById({
        _id: badgeId.badgeID,
      });
      return badge;
    });

    const badgesData = await Promise.all(badges).then((values) => {
      return values;
    });

    return {
      props: {
        Badges: JSON.parse(JSON.stringify(badgesData)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
