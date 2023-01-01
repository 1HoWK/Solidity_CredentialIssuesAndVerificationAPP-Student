import React from 'react';
import { Form, Button, Input, Alert } from "antd";
import { useRef } from "react";
import { useRouter } from 'next/router';
import { useState } from "react";


export default function Update_Name_Form({ student }) {
    const [form] = Form.useForm();
    const nameInputRef = useRef();
    const router = useRouter();

    const [error, setError] = useState("");

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
    const updateNameHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.input.value;
        try {

            if (enteredName) {
                // console.log("there is " + enteredName);

                const res = await fetch(`/api/student/updateName`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        studentId: student._id,
                        name: enteredName,
                    }),
                });

                router.reload(window.location.pathname);
            }

        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    return (
        <div>
            {error ? (
                <div style={{ marginBottom: "15px" }}>
                    <Alert message={`Error: ${error}`} type="error" />
                </div>
            ) : (
                ""
            )}
            <Form
                name="control-hooks"
                onFinish={onFinish}
                autoComplete="off"
                {...layout}
                form={form}
                onSubmitCapture={updateNameHandler}
            >
                <Form.Item
                    label="Current name"
                    name="current name"
                >
                    <span>{student.name}</span>
                </Form.Item>
                <Form.Item
                    label="New name"
                    name="new name"
                    rules={[{ required: true, message: 'Please input your new name!' }]}
                >
                    <Input placeholder='Your new name' ref={nameInputRef} />
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