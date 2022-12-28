import Stud_profile_form from "../../../components/ProfileStud/stud_profile_form";

import Student from "../../../models/student";
import Certificate_Student from "../../../models/certificate_student";
import Badge_Student from "../../../models/badge_student";
import Badge from "../../../models/badge";
import Certificate from "../../../models/certificate";

import { getSession } from "next-auth/react";
import connectMongo from "../../../utils/connectMongo";
import { useRouter } from "next/router";
import { Button, Col, Row } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const StudProfile = ({ studentData, certificatesData, badgesData }) => {
  const router = useRouter();
  
  return (
    <div>
      <Row style={{ marginBottom: "20px", }}  >
        <Col >
          <Button onClick={() => router.back()}
            icon={<LeftOutlined width="150px" height="150px" />}
            type="text"></Button>
        </Col>
      </Row>
      <Stud_profile_form
        details={studentData}
        Certificates={certificatesData}
        Badges={badgesData}
      />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    await connectMongo();

    const student = await Student.findById(id);

    const certStudent = await Certificate_Student.find({
      studentID: student._id,
    });

    const badgeStudent = await Badge_Student.find({
      studentID: student._id,
    });

    // console.log("stage 1");
    // console.log(certStudent);
    // console.log(badgeStudent);

    const certificates = certStudent.map(async (certStud) => {
      return await Certificate.findById(certStud.certificateID);
    });

    const badges = badgeStudent.map(async (badgeStud) => {
      return await Badge.findById(badgeStud.badgeID);
    });

    // console.log("stage 2");

    const certificatesData = await Promise.all(certificates).then((values) => {
      return values;
    });

    const badgesData = await Promise.all(badges).then((values) => {
      return values;
    });

    // console.log("stage 3");
    // console.log(certificatesData);
    // console.log(badgesData);
    // console.log("the end");

    return {
      props: {
        studentData: JSON.parse(JSON.stringify(student)),
        certificatesData: JSON.parse(JSON.stringify(certificatesData)),
        badgesData: JSON.parse(JSON.stringify(badgesData)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default StudProfile;
