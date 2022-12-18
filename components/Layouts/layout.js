import Student from './navbar';
import { Row, Col, Layout, Breadcrumb, Menu, Dropdown } from "antd";
const { Header, Footer, Content } = Layout;


import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function StudentLayout({ children }) {
    const router = useRouter();

    const { data: session, status } = useSession()
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (status === "authenticated") {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [status]);

    return (
        <>

            <div>
                <Layout style={{ minHeight: "100vh" }}>
                    <Student />
                    <Layout>
                        <Content
                            style={{
                                margin: "0 0",
                                background: "white",
                            }}
                        >
                            <div
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    minHeight: 360,
                                    background: "white",
                                }}
                            >

                                {children}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </>
    )
}