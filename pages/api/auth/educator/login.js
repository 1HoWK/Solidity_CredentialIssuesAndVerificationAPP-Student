import connectMongo from "../../../../utils/connectMongo";
import Educator from "../../../../models/educator";

// /**
//  * @param {import('next').NextApiRequest} req
//  * @param {import('next').NextApiResponse} res
//  */
export default async function LoginEducator(req, res) {
  try {
    // console.log('CONNECTING TO MONGO');
    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');

    // const data = JSON.parse(req.body);

    const { email, password } = req.body;

    const educator = await Educator.findOne({
      email: email,
      password: password,
    });

    console.log(educator);

    if(educator == null){
      console.log('no matched');
    }else{
      console.log('matched');
    }

    // console.log('CREATED DOCUMENT');

    res.json({ educator });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
