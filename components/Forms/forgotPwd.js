import { Form, Input, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./forgotPwd.module.css";

// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [form] = Form.useForm();

  // const { executeRecaptcha } = useGoogleReCaptcha();

  // const handleSumitForm = useCallback(
  //     (e) => {
  //         e.preventDefault();
  //         if (!executeRecaptcha) {
  //             console.log("Execute recaptcha not yet available");
  //             return;
  //         }
  //         executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
  //             console.log(gReCaptchaToken, "response Google reCaptcha server");
  //             submitEnquiryForm(gReCaptchaToken);
  //         });
  //     },
  //     [executeRecaptcha]
  // );

  // const submitEnquiryForm = (gReCaptchaToken) => {
  //     fetch("/api/enquiry", {
  //         method: "POST",
  //         headers: {
  //             Accept: "application/json, text/plain, */*",
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //             name: name,
  //             email: email,
  //             message: message,
  //             gRecaptchaToken: gReCaptchaToken,
  //         }),
  //     })
  //         .then((res) => res.json())
  //         .then((res) => {
  //             console.log(res, "response from backend");
  //             if (res?.status === "success") {
  //                 setNotification(res?.message);
  //             } else {
  //                 setNotification(res?.message);
  //             }
  //         });
  // };

  return (
    <div className={styles.sub_loginForm}>
      <h2 className={styles.forgotPwd_header}>Forgot Password</h2>
      <p className={styles.forgotPwd_sub_header}>
        Please provide your account email
      </p>

      <br/>
      <br/>

      <Form form={form} name="forgot password" scrollToFirstError>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          className={styles.margin_bottom_input}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`login-form-button ${styles.login_button}`}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
      <Link href="/student/login" className={styles.forgotPwd_redirect}>
        Back to login
      </Link>
    </div>
  );
}
