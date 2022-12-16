import { Schema, model, models } from "mongoose";

const certificateStudentSchema = new Schema({
  certificateID: {
    type: Schema.Types.ObjectId,
    ref: "Certificate",
    required: true,
  },
  studentID: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

const Certificate_Student =
  models.Certificate_Student ||
  model("Certificate_Student", certificateStudentSchema);

export default Certificate_Student;
