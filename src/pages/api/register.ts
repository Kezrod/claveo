export const prerender = false;

import type { APIContext } from "astro";
import { connectDB } from "../../lib/db";
import { User } from "../../lib/User";

export async function POST(context: APIContext) {
  const { request } = context;

  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password, birthDate } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son obligatorios" }),
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return new Response(
        JSON.stringify({ error: "El correo ya está registrado" }),
        { status: 409 }
      );
    }

    const newUser = await User.create({
      name,
      email,
      password,
      birthDate,
    });

    return new Response(
      JSON.stringify({ message: "✅ Usuario creado con éxito", user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error al registrar:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500 }
    );
  }
}
