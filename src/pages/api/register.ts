// src/pages/api/register.ts
import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { connectDB } from "../../lib/db";
import { User } from "../../lib/User";

export const POST: APIRoute = async ({ request }) => {
  try {
    await connectDB();

    const { name, email, password, birthdate } = await request.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400 });
    }

    const emailNorm = String(email).trim().toLowerCase();

    // ¿ya existe?
    const exists = await User.findOne({ email: emailNorm });
    if (exists) {
      return new Response(JSON.stringify({ error: "Este correo ya está registrado" }), { status: 409 });
    }

    // Hash 👇
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: String(name).trim(),
      email: emailNorm,
      password: hashed,
      birthDate: birthdate ? new Date(birthdate) : undefined,
      plan: "free",
    });

    return new Response(
      JSON.stringify({
        message: "✅ Cuenta creada",
        user: { id: user._id, name: user.name, email: user.email, plan: user.plan },
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error en register:", err);
    return new Response(JSON.stringify({ error: "Error en el registro" }), { status: 500 });
  }
};
