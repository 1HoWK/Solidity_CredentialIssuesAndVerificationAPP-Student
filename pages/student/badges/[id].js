import View_Credentials from "../../../components/Credentials/view_credentials";
import BadgeModel from '../../../models/badge';
import connectMongo from "../../../utils/connectMongo";



export default function Badge({credentialData}) {
  return (
    <div>
      <View_Credentials credential={credentialData}/>
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
    const Badge = await BadgeModel.findById(id);
    console.log("FETCHED DOCUMENTS");

    return {
      props: {
        credentialData: JSON.parse(JSON.stringify(Badge)),
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
