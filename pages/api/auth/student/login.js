import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../models/Student";

// /**
//  * @param {import('next').NextApiRequest} req
//  * @param {import('next').NextApiResponse} res
//  */
export default async function LoginStudent(req, res) {
  try {
    // console.log('CONNECTING TO MONGO');
    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');

    // const data = JSON.parse(req.body);

    const { email, password } = req.body;

    const student = await Student.findOne({
      email: email,
      password: password,
    });

    console.log(student);

    if(student == null){
      console.log('no matched');
    }else{
      console.log('matched');
    }

    // console.log('CREATED DOCUMENT');

    res.json({ student });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
