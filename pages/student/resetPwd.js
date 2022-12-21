import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import ResetPasswordForm from "../../components/Forms/resetPwd";
import { getSession } from "next-auth/react";

export default function ResetPwd() {
  return (
    <StudentAuthLayout imgSrc="/images/forgotPwd.jpg">
      <ResetPasswordForm />
    </StudentAuthLayout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  try {
    if (session) {
      return {
        redirect: {
          destination: "/student/certificates",
          permanent: false,
        },
      };
    }

    return {
      props: {
        Certificates: "123",
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
