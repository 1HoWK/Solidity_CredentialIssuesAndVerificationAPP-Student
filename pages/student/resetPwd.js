import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import ResetPasswordForm from "../../components/Forms/resetPwd";

export default function ResetPwd() {
  return (
    <StudentAuthLayout imgSrc="/images/forgotPwd.jpg">
      <ResetPasswordForm />
    </StudentAuthLayout>
  );
}
