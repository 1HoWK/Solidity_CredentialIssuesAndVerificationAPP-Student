import CredentialItem from "./credentials_item";

import { Row, Col, Space, Pagination } from "antd";
import styles from "./credential_grid.module.css";
import { useEffect, useState } from "react";

export default function CredentialsGrid({ items, specDeletePath }) {
  const [totalPage, setTotalPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const pageSize = 5;

  useEffect(() => {
    setTotalPage(items.length / pageSize);
    setMinIndex(0);
    setMaxIndex(pageSize);
  }, []);

  const handleChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
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
          items.map((item, index) => {
            if (index >= minIndex && index < maxIndex) {
              return (
                <Col
                  key={item._id}
                  className={`gutter-row ${styles.margin_bottom_card}`}
                >
                  <CredentialItem cert={item} deletePath={specDeletePath} />
                </Col>
              );
            }
          })
        )}
      </Row>
      <Row justify="center">
        <Col>
          {items.length <= pageSize ? (
            ""
          ) : (
            <Pagination
              pageSize={pageSize}
              current={current}
              total={items.length}
              onChange={handleChange}
              style={{ bottom: "0px" }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
