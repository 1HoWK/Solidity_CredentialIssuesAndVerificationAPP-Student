export default function indexedDB() {
    return (
        <div>
            <p>this is home page</p>
        </div>
    )
}

export const getServerSideProps = async (context) => {

    try {

        return {
            redirect: {
                destination: "/student/certificates",
                permanent: false,
            },
        };


    } catch (error) {
        return {
            notFound: true,
        };
    }
};