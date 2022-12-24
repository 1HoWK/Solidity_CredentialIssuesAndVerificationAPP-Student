import React from 'react';
import Link from 'next/link';
import { Avatar, List } from 'antd';


// work with hardcode list of items
export default function All_groups({ groups }) {

    return (
        <List
            itemLayout="horizontal"
            dataSource={groups}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<Link href={`/educator/group/${encodeURIComponent(item._id)}`}>{item.groupName}</Link>}
                        description={item.desc}
                    />
                </List.Item>
            )}
        />
    )
}
