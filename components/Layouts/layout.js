import Student from './navbar';
import { Row, Col, Layout, Breadcrumb, Menu, Dropdown } from "antd";
const { Header, Footer, Content } = Layout;


import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function StudentLayout({ children }) {
    const router = useRouter();

    const pathArr = router.pathname.split("/");

    let keyNum = 0;
    pathArr.shift();
    pathArr.shift();
    pathArr.unshift("Home");

    const handleNav = (event, currentPath) => {

        event.preventDefault();

        console.log("clicked");

        if (currentPath == "Home") {
            router.push("/educator/");
        } else {
            const redirectPath = router.pathname.split(currentPath);
            console.log(redirectPath[0]);
            router.push(redirectPath[0] + currentPath);

        }
    }

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
                                margin: "0 1.6rem",
                            }}
                        >
                            <Breadcrumb
                                style={{
                                    margin: "16px 0",
                                }}
                            >
                                {pathArr.map(path => {
                                    return (
                                        <Breadcrumb.Item key={keyNum++}>
                                            <a href="" onClick={e => handleNav(e, path)}>{path.charAt(0).toUpperCase() + path.slice(1)}</a>
                                        </Breadcrumb.Item>
                                    )
                                })}

                            </Breadcrumb>

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
                        <Footer
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        </>
    )
}