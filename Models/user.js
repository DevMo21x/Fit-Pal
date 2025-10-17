import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {},
  lastName: {},
  email: {},
  password: {},
});

export default new mongoose.model("User", userSchema);
