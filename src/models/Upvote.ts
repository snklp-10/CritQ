import mongoose, { Schema, Document } from "mongoose";

export interface IUpvote extends Document {
  user: mongoose.Types.ObjectId;
  review: mongoose.Types.ObjectId;
  createdAt: Date;
}

const UpvoteSchema = new Schema<IUpvote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
  },
  { timestamps: true }
);

const UpvoteModel =
  (mongoose.models.Upvote as mongoose.Model<IUpvote>) ||
  mongoose.model<IUpvote>("Upvote", UpvoteSchema);

export default UpvoteModel;
