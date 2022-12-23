import Image from "next/image";

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import { Card, Avatar } from "antd";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

import styles from "./credentials_item.module.css";

import TransformImage from "../utils/imageCloudinary";

export default function CredentialItem({ cert, deletePath }) {
  const router = useRouter();

  let actions = [
    <EyeOutlined
      key="view"
      onClick={() => router.push(`/student/${deletePath}/${cert._id}`)}
    />,
  ];

  const pdfRef = useRef();

  return (
    <div>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <>
            {deletePath === "certificates" ? (
              <div className={styles.content} ref={pdfRef}>
                <div>
                  <div className={styles.subContent}>
                    <h1 className={styles.userName}>username</h1>
                    <hr style={{ width: "100%" }} />
                    <p id="text" className={styles.paragraph}>
                      {cert.title}
                    </p>
                    <p id="text" className={styles.paragraph2}>
                      {cert.desc}
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
                      src="/images/logo.svg"
                      alt="this is the credBLOCK logo"
                      className={styles.logo}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {cert.imageAddress ? (
                  <>
                    <TransformImage
                      crop={"scale"}
                      image={cert.imageAddress}
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
          </>
        }
        actions={actions}
      >
        <div className={styles.meta}>
          <p className={styles.title}>{cert.title} </p>
          <p className={styles.description}>{cert.desc}</p>
        </div>
      </Card>
    </div>
  );
}
