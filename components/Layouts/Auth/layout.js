import Image from "next/image";

import { Row, Col } from "antd";

import styles from "./layout.module.css";

export default function StudentAuthLayout({ imgSrc, children }) {
  return (
    <div className={styles.login_layout}>
      <Row justify="center" className={styles.login}>
        <Col
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
            src={imgSrc}
            alt={`Picture of ${imgSrc} Page`}
            fill
            className={styles.standard_image}
            priority //the image that must be show first
          />
        </Col>

        <Col
          span={12}
          className={styles.loginForm}
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
          {children}
        </Col>
      </Row>
    </div>
  );
}
