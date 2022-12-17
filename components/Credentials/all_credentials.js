import CredentialsGrid from "./credential_grid";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useCallback, useEffect } from "react";
import styles from "./all_credentials.module.css";
import { useRouter } from "next/router";


export default function AllCredentials({ Credentials, path }) {
  return (
    <div className={styles.all_certificates_section}>
      <CredentialsGrid items={Credentials} specDeletePath={path} />
    </div>
  );
}
