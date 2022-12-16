import { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
  groupName: {
    type:String,
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
  educatorID: {
    type: Schema.Types.ObjectId,
    ref: 'Educator',
    required: true,
}
});

const Group = models.Group || model("Group", groupSchema);

export default Group;
