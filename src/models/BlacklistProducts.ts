import mongoose, { Schema, Document } from "mongoose";

export interface IBlacklist extends Document {
  user: mongoose.Schema.Types.ObjectId;
  productOrService: string;
  reason: string;
  category: string;
  rating: number;
  createdAt: Date;
}

const BlacklistSchema: Schema<IBlacklist> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productOrService: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlackListModel =
  (mongoose.models.Blacklist as mongoose.Model<IBlacklist>) ||
  mongoose.model<IBlacklist>("Blacklist", BlacklistSchema);

export default BlackListModel;
