import StudentAuthLayout from "../../components/Layouts/Auth/layout";
import LoginForm from "../../components/Forms/login";
export default function Login() {
    return (
        <StudentAuthLayout imgSrc="/images/login.jpg">
            <LoginForm />
        </StudentAuthLayout>
    );
}
