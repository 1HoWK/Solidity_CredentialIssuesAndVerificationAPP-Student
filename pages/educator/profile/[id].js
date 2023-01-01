import Edu_profile_form from "../../../components/ProfileEDU/edu_profile_form";
import All_groups from "../../../components/Group/all_groups";

import connectMongo from "../../../utils/connectMongo";
import Educator from "../../../models/educator";
import Certificate_Educator from "../../../models/certificate_educator";
import Badge_Educator from "../../../models/badge_educator";
import CertificateModel from "../../../models/certificate";
import BadgeModel from "../../../models/badge";
import { Button, Col, Row } from "antd";
import { Types } from "mongoose";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function profile({
  educatorData,
  certificatesData,
  badgesData,
}) {
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
      <Edu_profile_form details={educatorData} />
      <Row>
        <Col span={12}>
          <All_groups
            groups={certificatesData}
            title={"Certificates"}
            path={"certificates"}
          />
        </Col>
        <Col span={12}>
          <All_groups groups={badgesData} title={"Badges"} path={"badges"} />
        </Col>
      </Row>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    await connectMongo();

    const educator = await Educator.findById(id);

    const certArr = await Certificate_Educator.find({
      educatorID: educator._id,
    });

    const badgeArr = await Badge_Educator.find({
      educatorID: educator._id,
    });


    // console.log("start");
    //start
    const temp1Badge = await BadgeModel.find().distinct("address");

    const temp1 = new Map();
    // console.log("start-1");

    const badges = await badgeArr.map(async (tempBadgeID) => {
      // console.log("here-1");

      const badge = await BadgeModel.findOne({
        _id: tempBadgeID.badgeID,
      });
      // console.log("here-2");
      // console.log(badge);

      if (!temp1.get(badge.address)) {
        // console.log("running");
        temp1.set(badge.address, badge._id);
      }

      return badge;
    });

    // console.log("start-2");
    const badgeData = await Promise.all(badges).then((values) => {
      return values;
    });
    // console.log("start-3");
    const finalCrendentials = [];

    await temp1.forEach(async (value, key) => {
      // console.log(key);
      let objectKey = Types.ObjectId(value);
      const cert = await BadgeModel.findById(objectKey);

      finalCrendentials.push(cert);
    });

    // console.log("start ---- 2");

    const tempCertificate = await CertificateModel.find().distinct("address");

    const temp = new Map();

    const certificates = await certArr.map(async (tempBadgeID) => {
      const certificate = await CertificateModel.findById({
        _id: tempBadgeID.certificateID,
      });

      if (!temp.get(certificate.address)) {
        // console.log("running");
        temp.set(certificate.address, certificate._id);
      }

      return certificate;
    });

    const certificatesData = await Promise.all(certificates).then((values) => {
      return values;
    });

    const finalCert = [];

    await temp.forEach(async (value, key) => {
      // console.log(key);
      let objectKey = Types.ObjectId(value);
      const cert = await CertificateModel.findById(objectKey);

      finalCert.push(cert);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));


    return {
      props: {
        educatorData: JSON.parse(JSON.stringify(educator)),
        certificatesData: JSON.parse(JSON.stringify(finalCert)),
        badgesData: JSON.parse(JSON.stringify(finalCrendentials)),
      },
    };
  } catch (error) {
    console.log("it went here again");
    return {
      notFound: true,
    };
  }
};
