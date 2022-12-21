import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import SignUpForm from "../../components/Forms/signup";
import { getSession } from "next-auth/react";

export default function SignUp() {
  return (
    <StudentAuthLayout imgSrc="/images/signup.jpg">
      <SignUpForm />
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
