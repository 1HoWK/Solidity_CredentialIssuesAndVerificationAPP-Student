import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import SignUpForm from "../../components/Forms/signup";

export default function SignUp() {
  return (
    <StudentAuthLayout imgSrc="/images/signup.jpg">
      <SignUpForm />
    </StudentAuthLayout>
  );
}
