import { LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, Progress } from "antd";
import Link from "next/link";
import { useState } from "react";

import styles from "./resetPwd.module.css";

export default function ResetPasswordForm({ studentData }) {
  const [form] = Form.useForm();

  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const resetPassword = async () => {
    setIsSubmit(false);
    try {
      const res = await fetch(`/api/student/resetPwd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentData,
          password: password,
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
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
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
  );
}
