// src/pages/api/login.ts
import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { connectDB } from "../../lib/db";
import { User } from "../../lib/User";

export const POST: APIRoute = async ({ request }) => {
  await connectDB();

  const { email, password } = await request.json();
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Faltan campos" }), { status: 400 });
  }

  const emailNorm = String(email).trim().toLowerCase();
  const user = await User.findOne({ email: emailNorm });
  if (!user) return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });

  const stored = String(user.password || "");
  const isHash = stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$");

  let ok = false;
  if (isHash) {
    ok = await bcrypt.compare(password, stored);
  } else {
    // Usuario antiguo con password plano
    ok = password === stored;
    if (ok) {
      user.password = await bcrypt.hash(password, 10);
      await user.save(); // 🔒 migra a hash
    }
  }

  if (!ok) return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), { status: 401 });

  return new Response(
    JSON.stringify({
      message: "Inicio de sesión exitoso",
      user: { id: user._id, name: user.name, email: user.email, plan: user.plan, history: user.history },
    }),
    { status: 200 }
  );
};
