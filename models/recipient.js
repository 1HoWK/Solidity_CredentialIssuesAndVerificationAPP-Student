import { Schema, model, models } from "mongoose";

const recipientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Recipient = models.Recipient || model("Recipient", recipientSchema);

export default Recipient;
