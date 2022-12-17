import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import ForgotPasswordForm from "../../components/Forms/forgotPwd";

export default function ForgotPwd() {
    return (
        <StudentAuthLayout imgSrc="/images/forgotPwd.jpg">
            <ForgotPasswordForm />
        </StudentAuthLayout>
    );
}
