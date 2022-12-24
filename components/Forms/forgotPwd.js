import { Form, Input, Button, Row, Col, Progress } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "./forgotPwd.module.css";

// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [form] = Form.useForm();

  const [isSubmit, setIsSubmit] = useState(false);

  const [email, setEmail] = useState("");

  const forgotPassword = async () => {
    setIsSubmit(false);
    try {
      const res = await fetch(`/api/student/forgotPwd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await res.json();
      console.log(data);

      setIsSubmit(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isSubmit ? (
        <Row justify="center" align="middle">
          <Col style={{ marginBottom: "20px" }}>
            <Progress type="circle" percent={100} />
          </Col>
          <Col>
            <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
              Reset password link had sent to your email
            </h2>
          </Col>
          <Col>
            <Button>
              <Link href="/student/login">Back to Login</Link>
            </Button>
          </Col>
        </Row>
      ) : (
        <div className={styles.sub_loginForm}>
          <h2 className={styles.forgotPwd_header}>Forgot Password</h2>
          <p className={styles.forgotPwd_sub_header}>
            Please provide your account email
          </p>

          <br />
          <br />

          <Form form={form} onSubmitCapture={forgotPassword} name="forgot password" scrollToFirstError>
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
              <Input 
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
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
      )}
    </>
  );
}
