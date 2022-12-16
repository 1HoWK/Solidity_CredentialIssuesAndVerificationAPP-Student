import { Schema, model, models } from "mongoose";

const certificateEducatorSchema = new Schema({
  certificateID: {
    type: Schema.Types.ObjectId,
    ref: "Certificate",
    required: true,
  },
  educatorID: {
    type: Schema.Types.ObjectId,
    ref: "Educator",
    required: true,
  },
});

const Certificate_Educator =
  models.Certificate_Educator ||
  model("Certificate_Educator", certificateEducatorSchema);

export default Certificate_Educator;
