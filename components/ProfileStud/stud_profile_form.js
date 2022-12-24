import {
  Typography,
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Select,
  Option,
  AutoComplete,
  Divider,
  Row,
  Tooltip,
} from "antd";
import CredentialsGrid from "../Credentials/credential_grid";

export default function Stud_profile_form({ details, Certificates, Badges }) {
  const { Title } = Typography;

  return (
    <div>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        justify="center"
        align="middle"
        style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
      >
        <Col className="gutter-row">
          {/* <div style={style}>col-6</div> */}
          <Title> {details.name}</Title>
        </Col>
      </Row>

      {/* <Divider orientation="left">Your credentials</Divider> */}
      <Divider orientation="left" orientationMargin="0">
        Your Certificates
      </Divider>
      <CredentialsGrid
        items={Certificates}
        specDeletePath={"certificates"}
        itemPageSize={3}
        isVisitor={true}
      />
      <Divider orientation="left" orientationMargin="0">
        Your Badges
      </Divider>
      <CredentialsGrid
        items={Badges}
        specDeletePath={"badges"}
        itemPageSize={3}
        isVisitor={true}
      />
    </div>
  );
}
