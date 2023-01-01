import {
  LockOutlined,
  UserOutlined,
  CheckSquareOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col, Alert } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Loader from "../Layouts/loader";

import styles from "./signup.module.css";

export default function SignUpForm() {
  const router = useRouter();

  const emailInputRef = useRef();
  const passwordInputRef1 = useRef();
  const passwordInputRef2 = useRef();
  const nameInputRef = useRef();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.input.value;
    const enteredPassword1 = passwordInputRef1.current.input.value;
    const enteredPassword2 = passwordInputRef2.current.input.value;
    const enteredName = nameInputRef.current.input.value;

    // console.log(enteredEmail);
    // console.log(enteredPassword1);
    // console.log(enteredPassword2);
    // console.log(enteredName);

    setLoading(true);

    try {
      if (enteredPassword1 !== enteredPassword2) {
        throw new Error(
          "Password is not the same, Please enter the same password before submit"
        );
      }

      const res = await fetch(`/api/auth/student/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword2,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      await router.push("/student/login");
    } catch (err) {
      // console.log("Error happend on: educator sign up page");
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.sub_loginForm}>
            <h2 className={styles.header}>Sign Up</h2>
            <p className={styles.sub_header}>
              <span className={styles.emphasize_word}>Student</span>, Welcome
              Back
            </p>

            <br />

            <hr className={styles.hr_line} />

            <br />

            {error ? (
              <div style={{ marginBottom: "15px" }}>
                <Alert message={`Error: ${error}`} type="error" />
              </div>
            ) : (
              ""
            )}

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onSubmitCapture={onSubmitHandler}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    type: "string",
                    message: "The input is not valid username!",
                  },
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                  prefix={<ScheduleOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  ref={nameInputRef}
                />
              </Form.Item>
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
                  required
                  minLength="1"
                  maxLength="30"
                  ref={passwordInputRef1}
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                className={styles.margin_bottom_input}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Confirm Password"
                  ref={passwordInputRef2}
                  required
                  minLength="1"
                  maxLength="30"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={`login-form-button ${styles.login_button}`}
                >
                  Sign up
                </Button>
              </Form.Item>

              <Form.Item>
                <Row>
                  <Col span={1}>
                    <CheckSquareOutlined style={{ fontSize: "110%" }} />
                  </Col>
                  <Col span={23} style={{ paddingLeft: "10px" }}>
                    <span className={styles.xs_font}>
                      By signing up, you are agree to our{" "}
                      <a href="">Terms & Conditions and Privacy Policy</a>,
                      including Cookie Use.
                    </span>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item className={styles.text_align}>
                Already have an account?{" "}
                <Link href="/student/login">Login</Link>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </>
  );
}
