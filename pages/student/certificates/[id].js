import View_Credentials from "../../../components/Credentials/view_credentials";
import CertificateModel from "../../../models/certificate";

export default function Certificate({ credentialData }) {
  return (
    <div>
      <View_Credentials credential={credentialData} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("FETCHING DOCUMENTS");
    const Certificate = await CertificateModel.findById(id);
    console.log("FETCHED DOCUMENTS");

    return {
      props: {
        credentialData: JSON.parse(JSON.stringify(Certificate)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
