import pkg from "mongoose";
const { Schema, model, models } = pkg;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date },
  plan: { type: String, default: "free" },
  history: [
    {
      query: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

export const User = models.User || model("User", UserSchema);
