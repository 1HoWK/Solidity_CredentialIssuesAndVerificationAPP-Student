import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import LoginForm from "../../components/Forms/login";
import { useRouter } from "next/router";
import Loader from "../../components/Layouts/loader";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  return (
    <StudentAuthLayout imgSrc="/images/login.jpg">
      <LoginForm />
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
