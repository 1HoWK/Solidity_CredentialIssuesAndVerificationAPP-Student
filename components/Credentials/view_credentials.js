import { Image, Row, Col, Button } from "antd"
import { useRouter } from "next/router";

import styles from './view_credentials.module.css';


export default function View_Credentials({ credential }) {

    return (
        <div>
            <Row
                className={styles.view_cert_container}
                wrap
            >
                <Col
                    className={styles.view_cert_section1}
                    span={12}
                    xs={{
                        span: 24,
                    }}
                    sm={{
                        span: 12,
                    }}
                    lg={{
                        span: 12,
                    }}

                >
                    <Image
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        alt="credential pdf file "
                        fill
                        priority
                        className={styles.view_cert_image}
                    />
                </Col>
                <Col

                    span={12}
                    className={styles.view_cert_section2}
                    xs={{
                        span: 24,
                    }}
                    sm={{
                        span: 12,
                    }}
                    lg={{
                        span: 12,
                    }}
                >
                    <Row>
                        <Col span={24}>
                            <Row>
                                <Col span={24}><label htmlFor="" className={styles.view_cert_labels}>Id</label></Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <p className={styles.view_cert_texts}>{credential._id}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Row justify="space-between">
                                <Col><label htmlFor="" className={styles.view_cert_labels}>Title</label></Col>
                                <Col>
                                    <a className={styles.view_cert_link} type="text" primary>
                                        Edit
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <p className={styles.view_cert_texts}>{credential.title}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Row>
                                <Col span={24}><label htmlFor="" className={styles.view_cert_labels}>Date and Time</label></Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <p className={styles.view_cert_texts}>{credential.dateIssued}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Row justify="space-between">
                                <Col><label htmlFor="" className={styles.view_cert_labels}>Description</label></Col>
                                <Col>
                                    <a className={styles.view_cert_link} type="text" primary>
                                        Edit
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <p className={styles.view_cert_texts}>{credential.desc}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Row justify="space-between">
                                <Col><label htmlFor="" className={styles.view_cert_labels}>Group</label></Col>
                                <Col>
                                    <a className={styles.view_cert_link} type="text" primary>
                                        Edit
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <p className={styles.view_cert_texts}>Group 1</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}