import AllCredentials from "../../../components/Credentials/all_credentials";
import CertificateModel from "../../../models/certificate";
import connectMongo from "../../../utils/connectMongo";
import { getSession, useSession } from "next-auth/react";
import Student from "../../../models/Student";
import Certificate_Student from "../../../models/certificate_student";

export default function Credentials({ Certificates }) {
  return (
    <div style={{ padding: "3rem 0px" }}>
      <AllCredentials Credentials={Certificates} path="certificates" />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: "/student/login",
          permanent: false,
        },
      };
    }

  console.log(session.user.email);

  try {
    // console.log("CONNECTING TO MONGO");
    await connectMongo();
    // console.log("CONNECTED TO MONGO");

    // console.log("FETCHING DOCUMENTS");

    const { _id } = await Student.findOne({ email: session.user.email });
    console.log(_id);

    const certArr = await Certificate_Student.find({ studentID: _id });
    console.log(certArr);

    const certificates = await certArr.map(async (certID) => {
      const certificate = await CertificateModel.findById({
        _id: certID.certificateID,
      });
      return certificate;
    });
    // console.log("FETCHED DOCUMENTS");

    console.log("---------------------------------------");
    // console.log(certificates);

    const certificatesData = await Promise.all(certificates).then((values) => {
      return values;
    });

    return {
      props: {
        Certificates: JSON.parse(JSON.stringify(certificatesData)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
