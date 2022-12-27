import ForgotPwdLayout from "../../../components/Layouts/Auth/layout";
import ResetPwdForm from "../../../components/Forms/resetPwd";
import { getSession } from "next-auth/react";
import Student from "../../../models/student";

export default function ResetPwd({ studentData }) {
  return (
    <ForgotPwdLayout imgSrc="/images/resetPwd.jpg">
      <ResetPwdForm studentData={studentData} />
    </ForgotPwdLayout>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;

    const student = await Student.findById(id);

    return {
      props: {
        studentData: JSON.parse(JSON.stringify(student)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
