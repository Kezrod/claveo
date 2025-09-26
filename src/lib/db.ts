import dotenv from "dotenv";
dotenv.config();

import pkg from "mongoose";
const { connect } = pkg;

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("❌ No se encontró MONGODB_URI. Verifica tu archivo .env");
}

export async function connectDB() {
  try {
    await connect(uri);
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err);
  }
}
