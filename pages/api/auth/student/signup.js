import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../models/student";
import { hashPassword } from "../../../../utils/auth";

// /**
//  * @param {import('next').NextApiRequest} req
//  * @param {import('next').NextApiResponse} res
//  */
export default async function RegisterStudent(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    // console.log('CONNECTING TO MONGO');
    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');

    console.log(req.body);
    console.log("backend started");

    // await Student.create();

    const { name, email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 5
    ) {
      res.status(422).json({
        message:
          "Invalid input data",
      });
      return;
    }

    const emailUnique = await Student.findOne({ email: email });

    if (emailUnique) {
      res.status(422).json({
        message: "Email already exist.",
      });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const student = await Student.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // console.log('CREATED DOCUMENT');

    res.status(201).json({ message: "Created user!" });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
