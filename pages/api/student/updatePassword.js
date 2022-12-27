import connectMongo from "../../../utils/connectMongo";
import { hashPassword } from "../../../utils/auth";
import Student from "../../../models/student";

export default async function updatePWD(req, res) {
    try {
        console.log("CONNECTING TO MONGO");

        await connectMongo();
        // console.log('CONNECTED TO MONGO');

        console.log("here error");
        const selectedStudent = req.body.student;
        const newPassword = req.body.password;

        const encryptedPassword = await hashPassword(newPassword);
        console.log(encryptedPassword);

        const verifiedStudent = await Student.findById(selectedStudent._id);
        console.log(verifiedStudent);

        const updateSelectedStudentPassword = await Student.findByIdAndUpdate(verifiedStudent._id, {
            password: encryptedPassword,
        });

        res.status(201).json({ message: "Update password successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
