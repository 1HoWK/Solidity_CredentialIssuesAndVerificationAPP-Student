import { LockOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

import styles from "./resetPwd.module.css";

export default function ResetPasswordForm() {

    const [form] = Form.useForm();

    return (
        <div className={styles.sub_loginForm}>
            <h2 className={styles.forgotPwd_header}>Reset Password</h2>
            <p className={styles.forgotPwd_sub_header}>Please enter your new password</p>

            <Form
                form={form}
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
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                    className={styles.margin_bottom_input}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={`login-form-button ${styles.login_button}`}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}