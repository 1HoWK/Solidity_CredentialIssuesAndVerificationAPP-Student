import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button, Menu, Layout, Space, Dropdown, Drawer, Row, Col } from "antd";
import Link from "next/link";
import Image from "next/image";

import { BookOutlined, UserOutlined, BarsOutlined , DownOutlined} from "@ant-design/icons";


import styles from "./navbar.module.css";

export default function Student() {
    const router = useRouter();

    const useMediaQuery = (width) => {
        const [targetReached, setTargetReached] = useState(false);

        const updateTarget = useCallback((e) => {
            if (e.matches) {
                setTargetReached(true);
            } else {
                setTargetReached(false);
            }
        }, []);

        useEffect(() => {
            const media = window.matchMedia(`(max-width: ${width}px)`);
            media.addEventListener("change", updateTarget);

            // Check on mount (callback is not called until a change occurs)
            if (media.matches) {
                setTargetReached(true);
            }

            return () => media.removeEventListener("change", updateTarget);
        }, []);

        return targetReached;
    };

    const isBreakpoint = useMediaQuery(584);

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const logoutHandler = () => {
        signOut();
    };

    const items = [
        {
            label: <Link href="/student/profile">Profile</Link>,
            key: "0",
        },

        {
            type: "divider",
        },
        {
            label: <a onClick={logoutHandler}>Logout</a>,
            key: "1",
        },
    ];



    const { data: session, status } = useSession();
    const [isLogin, setIsLogin] = useState(false);

    console.log(status);

    useEffect(() => {
        if (status === "authenticated") {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [status]);

    return (
        <div>
            <div>
                {isBreakpoint ? (
                    <nav>
                        <Row
                            className={styles.navbar_section_student}
                            justify="space-between"
                            align="middle"
                        >
                            <Col className={styles.navbar_section_items} span={4}>
                                <img
                                    src="/images/logo.svg"
                                    alt="this is our logo"
                                    className={styles.navbar_section_items_1_image}
                                />
                            </Col>
                            <Col className={styles.navbar_section_items}>
                                <Button
                                    className={styles.barsMenu_student}
                                    type="primary"
                                    onClick={showDrawer}
                                >
                                    <BarsOutlined />
                                    {/* <span className={styles.barsBtn} /> */}
                                </Button>
                                <Drawer
                                    title=""
                                    placement="right"
                                    onClose={onClose}
                                    open={visible}
                                >
                                    <Row
                                        justify="center"
                                        align="middle"
                                        style={{ minHeight: "100%" }}
                                    >
                                        <Col>
                                            <Row justify="center" align="middle">
                                                <Col span={24}>
                                                    <Link
                                                        className={styles.drawer_nav_link}
                                                        href="/student/certificates"
                                                    >
                                                        <Space>
                                                            <BookOutlined />
                                                            Credentials
                                                        </Space>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col
                                            span={24}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "flex-end",
                                            }}
                                            onClick={() => {
                                                router.push("/student/profile");
                                            }}
                                        >
                                            <a className={styles.drawer_nav_link_danger}>
                                                <Space>
                                                    <UserOutlined />
                                                    <a onClick={logoutHandler}>Logout</a>
                                                </Space>
                                            </a>
                                        </Col>
                                    </Row>
                                </Drawer>
                            </Col>
                        </Row>
                    </nav>
                ) : (
                    <nav>
                        <Row
                            className={styles.navbar_section_student}
                            justify="space-between"
                            align="middle"
                        >
                            <Col className={styles.navbar_section_items} span={5}>
                                <img
                                    src="/images/logo.svg"
                                    alt="this is our logo"
                                    className={styles.navbar_section_items_1_image}
                                />
                            </Col>
                            <Col className={styles.navbar_section_items} span={19}>
                                <Row
                                    className={styles.navbar_section_items_section}
                                    justify="space-between"
                                    align="middle"
                                >


                                    {isLogin
                                        ?
                                        <>
                                            <Col span={18} >
                                                <Row>
                                                    <Space size="large">
                                                        <Col>
                                                            <Link
                                                                className={
                                                                    styles.navbar_section_items_section_1_item_student
                                                                }
                                                                href="/student/certificates"
                                                            >
                                                                Certificates
                                                            </Link>
                                                        </Col>
                                                        <Col>
                                                            <Link
                                                                className={
                                                                    styles.navbar_section_items_section_1_item_student
                                                                }
                                                                href="/student/badges"
                                                            >
                                                                Badges
                                                            </Link>
                                                        </Col>
                                                    </Space>
                                                </Row>
                                            </Col>
                                            <Col
                                                className={styles.navbar_section_items_section_2}
                                                span={6}
                                            >
                                                <Dropdown
                                                    placement="bottom"
                                                    arrow={{
                                                        pointAtCenter: true,
                                                    }}
                                                    menu={{
                                                        items,
                                                    }}
                                                    trigger={["click"]}
                                                    className={styles.navbar_section_items_section_2_dropdown}
                                                >
                                                    <button
                                                        className={
                                                            styles.navbar_section_items_section_2_button_student
                                                        }
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <Row justify="center" align="middle">
                                                            <Col>
                                                                <span className={
                                                                    styles.navbar_section_items_section_1_item_student}
                                                                    style={{ textTransform: "lowercase", }}>
                                                                    {session.user.email}
                                                                </span>
                                                            </Col>
                                                            <Col>
                                                                <DownOutlined style={{ color: "black", }} />
                                                            </Col>
                                                        </Row>
                                                    </button>
                                                </Dropdown>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col>
                                                {/* //search bar (if wanna do) */}
                                            </Col>
                                            <Col >
                                                <Row>
                                                    <Col style={{ marginRight: 15}}>
                                                        <Link href="/student/signup">
                                                            <Button className={styles.authFont}><span className={styles.authFont}>Create account</span></Button>
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Link href="/student/login">
                                                            <Button type="primary" ><span className={styles.authFont}>Sign in</span></Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </nav>
                )}
            </div>
        </div>
    );
}
