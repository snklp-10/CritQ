import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  reportedBy: mongoose.Types.ObjectId;
  reportedUser?: mongoose.Types.ObjectId;
  reportedReview?: mongoose.Types.ObjectId;
  reason: string;
  status: "pending" | "resolved";
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportedUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reportedReview: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ReportModel =
  (mongoose.models.Report as mongoose.Model<IReport>) ||
  mongoose.model<IReport>("Report", ReportSchema);

export default ReportModel;
