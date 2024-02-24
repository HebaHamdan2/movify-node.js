import mongoose, { Schema, model, Types } from "mongoose";
const favSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shows: [
      {
        showId: { type: String, required: true },
      },
    ],
    count:{
      type:Number,default:1
    }
  },
  {
    timestamps: true,
  }
);

const favModel = mongoose.models.Fav || model("Fav", favSchema);
export default favModel;
