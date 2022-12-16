import { Schema, model, models } from "mongoose";

const certificateSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  dateIssued: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Certificate =
  models.Certificate || model("Certificate", certificateSchema);

export default Certificate;
