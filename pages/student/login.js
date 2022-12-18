import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import LoginForm from "../../components/Forms/login";
import { useRouter } from "next/router";
import Loader from "../../components/Layouts/loader";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     getSession().then((session) => {
//       if (!session) {
//         router.replace("/student/login");
//       } else {
//         setIsLoading(false);
//       }
//     });
//   }, [router]);

//   if (isLoading) {
//     return <Loader />;
//   }

  return (
    <StudentAuthLayout imgSrc="/images/login.jpg">
      <LoginForm />
    </StudentAuthLayout>
  );
}
