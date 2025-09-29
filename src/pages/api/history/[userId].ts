import type { APIRoute } from "astro";
import { connectDB } from "../../../lib/db";
import { User } from "../../../lib/User";

export const GET: APIRoute = async ({ params }) => {
  await connectDB();
  const { userId } = params;

  const user = await User.findById(userId);
  if (!user) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
  }

  return new Response(JSON.stringify({ history: user.history }), { status: 200 });
};
