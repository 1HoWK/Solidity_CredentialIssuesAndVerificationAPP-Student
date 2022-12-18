import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import styles from "./login.module.css";

export default function LoginForm() {
  const router = useRouter();

    const [error, setError] = useState(false);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const loginEducator = async (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.input.value;
        const enteredPassword = passwordInputRef.current.input.value;


        const result = await signIn('credentials', {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword,
        })

        console.log(result);

        if(!result.error){
            router.replace('/student/certificates');
        }

    };

  return (
    <div className={styles.sub_loginForm}>
      <h2 className={styles.header}>Login</h2>
      <p className={styles.sub_header}>
        <span className={styles.emphasize_word}>Student</span>, Welcome Back
      </p>

      <br />

      <hr className={styles.hr_line} />

      <br />

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onSubmitCapture={loginEducator}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            ref={emailInputRef}
          />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>

            <Col>
              <Link className="login-form-forgot" href="/student/forgotPwd">
                Forgot password
              </Link>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`login-form-button ${styles.login_button}`}
          >
            Log in
          </Button>
        </Form.Item>

        <Form.Item className={styles.text_align}>
          Don't have an account? <Link href="/student/signup">Sign Up</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
