import { LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, Progress, Alert } from "antd";
import Link from "next/link";
import { useState } from "react";
import Loader from "../Layouts/loader";

import styles from "./resetPwd.module.css";

export default function ResetPasswordForm({ studentData }) {
  const [form] = Form.useForm();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const resetPassword = async () => {
    setIsSubmit(false);
    setLoading(true);
    try {
      if (password1 !== password2) {
        throw new Error(
          "Password is not the same, Please enter the same password before submit"
        );
      }

      const res = await fetch(`/api/student/resetPwd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentData,
          password: password2,
        }),
      });
      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      setIsSubmit(true);
    } catch (err) {
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
          {isSubmit ? (
            <Row justify="center" align="middle">
              <Col style={{ marginBottom: "20px" }}>
                <Progress type="circle" percent={100} />
              </Col>
              <Col span={24}>
                <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
                  Updated the password!
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
              <h2 className={styles.forgotPwd_header}>Reset Password</h2>
              <p className={styles.forgotPwd_sub_header}>
                Please enter your new password
              </p>

              {error ? (
                <div style={{ marginBottom: "15px" }}>
                  <Alert message={`Error: ${error}`} type="error" />
                </div>
              ) : (
                ""
              )}

              <Form
                form={form}
                onSubmitCapture={resetPassword}
                name="reset password"
                scrollToFirstError
              >
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
                    value={password1}
                    onChange={(event) => {
                      setPassword1(event.target.value);
                    }}
                    required
                    minLength="1"
                    maxLength="30"
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
                    value={password2}
                    onChange={(event) => {
                      setPassword2(event.target.value);
                    }}
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
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </>
      )}
    </>
  );
}
