import mongoosePkg from "mongoose";
const { Schema, model, models } = mongoosePkg;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date },
    plan: {
      type: String,
      enum: ["free", "pro", "xl"],
      default: "free", // 👈 por defecto siempre será Free
    },
    subscriptionActive: { type: Boolean, default: false },
    subscriptionExpires: { type: Date }, // fecha en que expira el plan
    history: [
      {
        query: String,
        response: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
