import { Schema, model, models } from "mongoose";

const badgeStudentSchema = new Schema({
  badgeID: {
    type: Schema.Types.ObjectId,
    ref: "Badge",
    required: true,
  },
  studentID: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

const Badge_Student =
  models.Badge_Student ||
  model("Badge_Student", badgeStudentSchema);

export default Badge_Student;
