import mongoose from "mongoose";

const TempUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1d" }, // Automatically delete after 1 day
});

const TempUserModel =
  mongoose.models.TempUser || mongoose.model("TempUser", TempUserSchema);

export default TempUserModel;
