import { Image, Row, Col, Button, Input, Modal, Progress, Spin } from "antd";
import Link from "next/link";
import { CheckCircleTwoTone, LeftOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import { useRef, useState } from "react";

import styles from "./view_credentials.module.css";

import Loader from "../Layouts/loader";

import Certificate from "../../etheruem/certificate";

import GeneratePDF from "../utils/GeneratePDF";
import TransformImage from "../utils/imageCloudinary";

export default function View_Credentials({
  credential,
  belongTo,
  isUser,
  IssuedBy,
  CredentialType,
}) {
  //for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [processText, setProcessText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showProcess = async () => {
    setIsLoading(false);

    if (CredentialType === "certificate") {
      const certificate = Certificate(credential.address);

      const title = await certificate.methods.getTitle().call();
      const description = await certificate.methods.getDescription().call();
      const dateIssued = await certificate.methods.getDateIssued().call();

      if (credential.title != title) {
        //update title
      }
      if (credential.desc != description) {
        //update description
      }
      if (credential.dateIssued != dateIssued) {
        //update dateIssued
      }
    }

    setProcessText("checking Issued date...");
    await delay(700);
    setProcessText("checking title...");
    await delay(700);
    setProcessText("checking description...");
    await delay(700);
    setProcessText("checking credential id...");
    await delay(700);
    setProcessText("It is Verified");
    setIsLoading(true);
  };

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
  const [copySuccess, setCopySuccess] = useState("Copy");
  const textAreaRef = useRef(null);

  const delay = async (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const copyToClipboard = async (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
    await delay(1500);

    setCopySuccess("Copy");
  };

  const pdfRef = useRef();

  return (
    <div>
      {isUser ? (
        <Modal
          title="Share a Link"
          width={400}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row>
            <label htmlFor="URL">Credential URLs</label>
          </Row>
          <Row>
            <Input
              ref={textAreaRef}
              value={`http://localhost:3000/${CredentialType}s/${credential._id}`}
              className={styles.creden_input_link}
            />
            <button onClick={copyToClipboard} className={styles.creden_share}>
              {copySuccess}
            </button>
          </Row>
        </Modal>
      ) : (
        <Modal
          title="Verification"
          width={400}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row justify="center" align="middle">
            <Col span={12} className={styles.loader_section}>
              {isLoading ? (
                <Progress type="circle" percent={100} />
              ) : (
                <Spin size="large" />
              )}
            </Col>
          </Row>
          <Row>
            <Col span={12} className={styles.loader_section2}>
              <p className={styles.verification_text}>{processText}</p>
            </Col>
          </Row>
        </Modal>
      )}
      <Row justify="center" align="middle" className={styles.credential_block}>
        <Col span={18}>
          This {CredentialType} was issued to{" "}
          <Link
            href={`/student/profile/${belongTo._id}`}
            className={styles.profile_link}
          >
            {belongTo.name}
          </Link>{" "}
          on {credential.dateIssued}
        </Col>
        <Col span={4}>
          {isUser ? (
            <Button type="primary" onClick={showModal}>
              Share
            </Button>
          ) : (
            // <Button type="primary" onClick={showModal} >Verify Certificate</Button>
            <Button type="primary" onClick={showModal2}>
              Verify Credential
            </Button>
          )}
        </Col>
      </Row>
      <Row className={styles.view_cert_container} wrap>
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
          {CredentialType === "certificate" ? (
            <div className={styles.content} ref={pdfRef}>
              <div>
                <div className={styles.subContent}>
                  <h1 className={styles.userName}>{belongTo.name}</h1>
                  <hr style={{ width: "100%" }} />
                  <p id="text" className={styles.paragraph}>
                    {credential.title}
                  </p>
                  <p id="text" className={styles.paragraph2}>
                    {credential.desc}
                  </p>
                </div>
                <div className={styles.subContent2}>
                  <img
                    src="/images/signatureCred.png"
                    alt="this is the signature"
                    className={styles.signature}
                  />
                  <hr style={{ width: "100%" }} />
                  <img
                    src="/images/logo-stud.svg"
                    alt="this is the credBLOCK logo"
                    className={styles.logo}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {credential.imageAddress ? (
                <>
                  <TransformImage
                    crop={"scale"}
                    image={credential.imageAddress}
                    width={300}
                    height={300}
                  />
                </>
              ) : (
                <img
                  src="/images/defaultBadge.png"
                  width={300}
                  height={300}
                  alt="default badge image"
                  srcSet=""
                />
              )}
            </>
          )}
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
          style={{ paddingBottom: "30px" }}
        >
          <Row>
            <Col span={24}>
              <p className={styles.title}>{credential.title}</p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p className={styles.issuedBy}>
                Issued by{" "}
                <Link href="/student/certificates">
                  <span className={styles.link}>{IssuedBy.name}</span>
                </Link>
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row justify="space-between">
                <Col>
                  <label htmlFor="" className={styles.view_cert_labels}>
                    Description
                  </label>
                </Col>
              </Row>
            </Col>
            <Col>
              <p className={styles.view_cert_texts}>{credential.desc}</p>
            </Col>
          </Row>
          <Row style={{ width: "100%" }} justify="space-between" align="middle">
            {CredentialType === "certificate" ? (
              <>
                {isUser ? (
                  <Col span={24}>
                    <GeneratePDF html={pdfRef} />
                  </Col>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
