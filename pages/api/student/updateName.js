import connectMongo from "../../../utils/connectMongo";
import Student from "../../../models/student";

export default async function updateName(req, res) {
    try {
        // console.log("CONNECTING TO MONGO");

        await connectMongo();
        // console.log('CONNECTED TO MONGO');

        // console.log('CREATING DOCUMENT');
        const newName = req.body.name;
        const id = req.body.studentId;

        // console.log(newName);
        // console.log(id);

        const newStudentName = await Student.findByIdAndUpdate(id, {
            name: newName,
        });

        res.status(201).json({ message: "update name successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
