import { Schema, model, models } from "mongoose";

const badgeEducatorSchema = new Schema({
  badgeID: {
    type: Schema.Types.ObjectId,
    ref: "Badge",
    required: true,
  },
  educatorID: {
    type: Schema.Types.ObjectId,
    ref: "Educator",
    required: true,
  },
});

const Badge_Educator =
  models.Badge_Educator ||
  model("Badge_Educator", badgeEducatorSchema);

export default Badge_Educator;
