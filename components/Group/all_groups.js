import React from "react";
import Link from "next/link";
import { Avatar, Divider, List } from "antd";

import styles from "./all_groups.module.css";

// work with hardcode list of items
export default function All_groups({ groups, title, path }) {
  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        {title}
      </Divider>
      <List
        itemLayout="horizontal"
        dataSource={groups}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link
                  className={styles.textLimitation}
                  href={`/educator/${path}/${item._id}`}
                >
                  {item.title}
                </Link>
              }
              description={
                <div className={styles.textLimitation}>{item.desc}</div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}
