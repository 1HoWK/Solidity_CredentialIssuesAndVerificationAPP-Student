import AllCredentials from "../../../components/Credentials/all_credentials";
import CertificateModel from "../../../models/certificate";
import connectMongo from "../../../utils/connectMongo";
import { getSession, useSession } from "next-auth/react";


export default function Credentials({ Certificates }) {
  return (
    <div style={{ padding: "3rem 0px" }}>
      <AllCredentials Credentials={Certificates} path="certificates" />
    </div>
  );
}

export const getServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/student/login",
//         permanent: false,
//       },
//     };
//   }

  try {
    // console.log("CONNECTING TO MONGO");
    await connectMongo();
    // console.log("CONNECTED TO MONGO");

    // console.log("FETCHING DOCUMENTS");
    const Certificates = await CertificateModel.find();
    // console.log("FETCHED DOCUMENTS");

    return {
      props: {
        Certificates: JSON.parse(JSON.stringify(Certificates)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
