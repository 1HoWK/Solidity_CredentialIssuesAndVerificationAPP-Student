import { Row, Space, Spin } from "antd";
import styles from './loader.module.css';

export default function Loader() {
  return (
    <Row justify="center" align="center" className={styles.center}>
      <Space>
        <Spin size="large" />
      </Space>
    </Row>
  );
}
