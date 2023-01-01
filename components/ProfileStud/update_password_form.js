import React from 'react';
import { Form, Button, Input, Alert } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import { verifyPassword } from '../../utils/auth';

export default function Update_Password_Form({ studentData }) {
    const [form] = Form.useForm();

    const [currentpassword, setCurrentPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [error, setError] = useState("");

    const router = useRouter();

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const onFinish = (values) => {
        // console.log(values);
    };

    // form onsubmit fucntion
    const updatePasswordHandler = async (event) => {

        // compared given current password with the hashed one
        const result = await verifyPassword(currentpassword, studentData.password);

        try {
            // check if the given current password is true
            if (result) {
                if (password1 !== password2) {
                    throw new Error(
                        "Password is not the same, Please enter the same password before submit"
                    );
                } else {
                    // console.log("here");
                    const res = await fetch(`/api/student/updatePassword`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            student: studentData,
                            password: password2,
                        }),
                    });
                    // console.log("here2");

                    const result = await res.json();
                    // console.log(result);

                    if (!res.ok) {
                        throw new Error(result.message || "Something went wrong!");
                    }{
                        
                    }

                    router.reload(window.location.pathname);
                }

            } else {
                throw new Error(result.message || "Current password is wrong!");
            }
        } catch (err) {
            // console.log(err);
            setError(err.message);
        }

    };

    return (
        <div>
            {error ? (
                <div style={{ marginBottom: "15px" }}>
                    <Alert message={`Error: ${error}`} type="error" />
                </div>
            ) : (""
            )}
            <Form
                name="control-hooks"
                onFinish={onFinish}
                autoComplete="off"
                {...layout}
                form={form}
                onSubmitCapture={updatePasswordHandler}
            >
                <Form.Item
                    label="Current password"
                    name="current password"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                    <Input.Password
                        value={currentpassword}
                        placeholder='Your current password'
                        onChange={(event) => {
                            setCurrentPassword(event.target.value);
                        }}
                        minLength="1"
                        maxLength="30"
                        required />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password
                        type="password"
                        value={password1}
                        placeholder='Your new password'
                        onChange={(event) => {
                            setPassword1(event.target.value);
                        }}
                        required
                        minLength="1"
                        maxLength="30"
                    />
                </Form.Item>

                <Form.Item
                    label="New Password Again"
                    name="newPasswordAgain"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                    ]}
                >
                    <Input.Password
                        type="password"
                        value={password2}
                        placeholder='Type your new password again'
                        onChange={(event) => {
                            setPassword2(event.target.value);
                        }}
                        required
                        minLength="1"
                        maxLength="30" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={() => { form.resetFields(); }}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>


        </div>
    );
}