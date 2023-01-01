import connectMongo from "../../../utils/connectMongo";
import { hashPassword } from "../../../utils/auth";
import Student from "../../../models/student";

export default async function updatePWD(req, res) {
    try {
        // console.log("CONNECTING TO MONGO");

        await connectMongo();
        // console.log('CONNECTED TO MONGO');

        // console.log("here error");
        const selectedStudent = req.body.student._id;
        const newPassword = req.body.password;

        const encryptedPassword = await hashPassword(newPassword);
        // console.log(encryptedPassword);

        const updateSelectedStudentPassword = await Student.findByIdAndUpdate(selectedStudent, {
            password: encryptedPassword,
        });

        res.status(201).json({ message: "Update password successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
