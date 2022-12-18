import CredentialItem from "./credentials_item";

import { Row, Col, Space, Pagination } from "antd";
import styles from "./credential_grid.module.css";

export default function CredentialsGrid({ items, specDeletePath }) {
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div>
      <Row
        justify="center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        wrap
      >
        {items == undefined || items.length == 0 ? (
          <div>
            <h2>{`0 ${specDeletePath}`}</h2>
          </div>
        ) : (
          items.map((item) => {
            return (
              <Col
                key={item._id}
                className={`gutter-row ${styles.margin_bottom_card}`}
              >
                <CredentialItem cert={item} deletePath={specDeletePath} />
              </Col>
            );
          })
        )}
      </Row>
      {/* <Row justify="center">
        <Col>
          <Pagination total={80} itemRender={itemRender} />
        </Col>
      </Row> */}
    </div>
  );
}
