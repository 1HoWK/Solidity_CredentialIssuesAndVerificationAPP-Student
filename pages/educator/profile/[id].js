import Edu_profile_form from "../../../components/Edu_profile/edu_profile_form"
import All_groups from "../../../components/Group/all_groups"


import connectMongo from '../../../utils/connectMongo';
import GroupModel from '../../../models/group';
import Educator from "../../../models/educator";

export default function profile({groups, edu_details}) {
    return (
        <div>
            <Edu_profile_form details={edu_details} />
            <All_groups groups={groups}/>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    //const session = await getSession({ req: context.req });

    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: "/educator_acc/login",
    //             permanent: false,
    //         },
    //     };
    // }

    // const { _id } = await Educator.findOne({ email: session.user.email });

    try {
        await connectMongo();

        const eduDetails = await Educator.findById(
            '639ac3c99a9c5160501265ac'
        );

        const allGroups = await GroupModel.find({
            // hardcoded
            educatorID: '639ac3c99a9c5160501265ac'
        });

        return { props: { groups: JSON.parse(JSON.stringify(allGroups)),   edu_details: JSON.parse(JSON.stringify(eduDetails))} }

    } catch (error) {
        return {
            notFound: true,
        };
    }
};