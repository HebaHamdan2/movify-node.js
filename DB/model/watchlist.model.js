import mongoose, { Schema, model, Types } from "mongoose";
const watchlistSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shows: [
      {
        showId: { type: Number,required:true },
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

const watchlistModel = mongoose.models.Watchlist || model("Watchist", watchlistSchema);
export default watchlistModel;
