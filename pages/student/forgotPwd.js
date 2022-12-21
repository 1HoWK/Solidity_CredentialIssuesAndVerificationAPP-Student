import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import ForgotPasswordForm from "../../components/Forms/forgotPwd";
import { getSession } from "next-auth/react";

export default function ForgotPwd() {
  return (
    <StudentAuthLayout imgSrc="/images/forgotPwd.jpg">
      <ForgotPasswordForm />
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
