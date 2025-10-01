import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String, // si tienes auth local
    plan: {
        type: String,
        enum: ["free", "tier1", "tier2"],
        default: "free",
    },
    searchesUsed: { type: Number, default: 0 }, // solo se cuenta si es free
});

export default mongoose.model("User", userSchema);
