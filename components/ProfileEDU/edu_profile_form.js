import { Typography, Button, Checkbox, Form, Input, Col, Select, Option, AutoComplete, Divider, Row, Tooltip } from "antd";

export default function Edu_profile_form({ details }) {

    const { Title } = Typography;

    return (
        <div >
            <Row
                justify="center"
                align="middle"
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
                style={{width:"100%", }}
            >
                <Col className="gutter-row">
                    <Title>{details.name}</Title>
                </Col>

            </Row>

            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >


                <Col className="gutter-row" span={6} style={{ margin: 50 }}>
                    <Title level={3}>Name:</Title>
                    <p><span>{details.name}</span></p>
                </Col>
                <Col className="gutter-row" span={6} style={{ margin: 50 }}>
                    <Title level={3}>Job Title:</Title>
                    <p><span>{details.jobTitle}</span></p>
                </Col>
                <Col className="gutter-row" span={6} style={{ margin: 50 }}>
                    <Title level={3}>Organization Name:</Title>
                    <p><span>{details.orgName}</span></p>
                </Col>

            </Row>

            {/* <Divider orientation="left">Your credentials</Divider> */}
            



        </div>

    );
}
