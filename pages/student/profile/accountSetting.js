import Stud_account_settings from "../../../components/ProfileStud/account_settings_forms";

import { getSession } from "next-auth/react";
import Student from "../../../models/student";
import connectMongo from "../../../utils/connectMongo";

export default function updatePassword({ studentDetails }) {
  return (
    <div>
      <Stud_account_settings studentDetail={studentDetails} />
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
  try {

    await connectMongo();

    const student = await Student.findOne({ email: session.user.email });

    return { props: { studentDetails: JSON.parse(JSON.stringify(student)) } };

  } catch (error) {
    console.log(error); 1

    return {
      notFound: true,
    };
  }
};
