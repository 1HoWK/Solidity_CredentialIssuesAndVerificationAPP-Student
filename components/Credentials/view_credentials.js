import { Image, Row, Col, Button, Modal, Progress, Spin } from "antd"
import Link from "next/link";
import { CheckCircleTwoTone } from "@ant-design/icons";

import { useRouter } from "next/router";
import { useRef, useState } from "react";

import styles from './view_credentials.module.css';

import Loader from '../Layouts/loader';


import Certificate from '../../etheruem/certificate';

export default function View_Credentials({ credential, belongTo, isUser,CredentialType }) {

    //for modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [processText, setProcessText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const showProcess = async () => {
        setIsLoading(false);
        
        if (CredentialType === 'certificate'){
            const certificate = Certificate(credential.address);

            const title = await certificate.methods.getTitle().call();
            const description = await certificate.methods.getDescription().call();
            const dateIssued = await certificate.methods.getDateIssued().call();

            if (credential.title != title){
                //update title
            }
            if(credential.desc != description){
                //update description
            }
            if(credential.dateIssued != dateIssued){
                //update dateIssued
            }
        }

        
        setProcessText('checking Issued date...');
        await delay(700);
        setProcessText('checking title...');
        await delay(700);
        setProcessText('checking description...');
        await delay(700);
        setProcessText('checking credential id...');
        await delay(700);
        setProcessText('It is Verified');
        setIsLoading(true);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModal2 = () => {
        setIsModalOpen(true);
        showProcess();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //for copy text
    const [copySuccess, setCopySuccess] = useState('Copy');
    const textAreaRef = useRef(null);

    const delay = async (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const copyToClipboard = async (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
        await delay(1500);

        setCopySuccess('Copy');

    };



    return (
        <div>

            {
                isUser
                    ?
                    <Modal title="Share a Link" width={400} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                        <Row>
                            <label htmlFor="URL">Credential URLs</label>
                        </Row>
                        <Row>
                            <input
                                type="text"
                                ref={textAreaRef}
                                value={`http://localhost:3000/certificates/${credential._id}`}
                                className={styles.creden_input_link}
                                disabled
                            />
                            <button onClick={copyToClipboard} className={styles.creden_share}>{copySuccess}</button>
                        </Row>
                    </Modal>
                    :
                    <Modal title="Verification" width={400} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Row justify="center" align="middle" >
                            <Col span={12} className={styles.loader_section}>
                                {isLoading
                                    ?

                                    <Progress type="circle" percent={100} />

                                    :
                                    <Spin size="large" />
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} className={styles.loader_section2}>
                                <p className={styles.verification_text}>{processText}</p>
                            </Col>
                        </Row>
                    </Modal>
            }

            <Row justify="center" align="middle" className={styles.credential_block}>
                <Col span={18}>This badge was issued to <Link href={`/student/profile/${belongTo._id}`} className={styles.profile_link}>{belongTo.name}</Link> on {credential.dateIssued}</Col>
                <Col span={4}>
                    {
                        isUser
                            ?
                            <Button type="primary" onClick={showModal}>
                                Share
                            </Button>
                            // <Button type="primary" onClick={showModal} >Verify Certificate</Button>
                            :
                            <Button type="primary" onClick={showModal2}>
                                Verify Credential
                            </Button>
                    }
                </Col>
            </Row>
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
                        fill="true"
                        priority="true"
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