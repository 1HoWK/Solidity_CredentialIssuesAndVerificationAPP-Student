import Image from "next/image";

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import { Card, Avatar } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "./credentials_item.module.css";

export default function CredentialItem({ cert, deletePath }) {
  const router = useRouter();

  let actions = [
    <EyeOutlined
      key="view"
      onClick={() => router.push(`/student/${deletePath}/${cert._id}`)}
    />,
  ];

  return (
    <div>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
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
