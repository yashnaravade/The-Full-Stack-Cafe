import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
