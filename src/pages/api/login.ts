import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { connectDB } from "../../lib/db";
import { User } from "../../lib/User";

export const POST: APIRoute = async ({ request }) => {
  await connectDB();

  const { email, password } = await request.json();

  // Validar campos
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Faltan campos" }), { status: 400 });
  }

  // Buscar usuario
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
  }

  // Verificar contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), { status: 401 });
  }

  // Responder con datos del usuario
  return new Response(
    JSON.stringify({
      message: "Inicio de sesión exitoso",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        history: user.history,
      },
    }),
    { status: 200 }
  );
};
