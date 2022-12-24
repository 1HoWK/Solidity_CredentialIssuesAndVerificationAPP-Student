import Edu_profile_form from "../../../components/ProfileEDU/edu_profile_form";
import All_groups from "../../../components/Group/all_groups";

import connectMongo from "../../../utils/connectMongo";
import Educator from "../../../models/educator";
import Certificate_Educator from "../../../models/certificate_educator";
import Badge_Educator from "../../../models/badge_educator";
import Certificate from "../../../models/certificate";
import Badge from "../../../models/badge";
import { Col, Row } from "antd";


export default function profile({ educatorData, certificatesData, badgesData }) {


    return (
        <div>
            <Edu_profile_form details={educatorData} />
            <Row>
                <Col span={12}>
                    <All_groups groups={certificatesData} title={"Certificates"} path={"certificates"}/>
                </Col>
                <Col span={12}>
                    <All_groups groups={badgesData} title={"Badges"} path={"badges"}/>
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

        const certEducator = await Certificate_Educator.find({
            educatorID: educator._id,
        });

        const badgeEducator = await Badge_Educator.find({
            educatorID: educator._id,
        });

        // console.log("stage 1");
        // console.log(certEducator);
        // console.log(badgeEducator);

        const certificates = certEducator.map(async (certStud) => {
            return await Certificate.findById(certStud.certificateID);
        });

        const badges = badgeEducator.map(async (badgeStud) => {
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
                educatorData: JSON.parse(JSON.stringify(educator)),
                certificatesData: JSON.parse(JSON.stringify(certificatesData)),
                badgesData: JSON.parse(JSON.stringify(badgesData)),
            },
        };
    } catch (error) {
        console.log("it went here again")
        return {
            notFound: true,
        };
    }
};
