import connectMongo from "../../../../utils/connectMongo";
import Educator from "../../../../models/educator";
import { hashPassword } from "../../../../utils/auth";

// /**
//  * @param {import('next').NextApiRequest} req
//  * @param {import('next').NextApiResponse} res
//  */
export default async function RegisterEducator(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    // console.log('CONNECTING TO MONGO');
    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');

    console.log(req.body);
    console.log("backedn started");

    const { email, password, name, phoneNum, jobTitle, orgName, orgURL , accountType} =
      req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 5
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 5 characters long.",
      });
      return;
    }

    const emailUnique = await Educator.findOne({email:email});

    if(emailUnique){
      res.status(422).json({
        message:
          "Invalid input - the email already exist.",
      });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const educator = await Educator.create({
      email: email,
      password: hashedPassword,
      name: name,
      phoneNum: phoneNum,
      jobTitle: jobTitle,
      orgName: orgName,
      orgURL: orgURL,
      accountType:accountType,
    });
    // console.log('CREATED DOCUMENT');

    res.status(201).json({ message: "Created user!" });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
