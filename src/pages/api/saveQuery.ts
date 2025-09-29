import type { APIRoute } from "astro";
import { connectDB } from "../../lib/db";
import { User } from "../../lib/User";

export const POST: APIRoute = async ({ request }) => {
  await connectDB();
  const { userId, query } = await request.json();

  if (!userId || !query) {
    return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
  }

  await User.findByIdAndUpdate(userId, {
    $push: { history: { query, date: new Date() } }
  });

  return new Response(JSON.stringify({ message: "Consulta guardada" }), { status: 200 });
};
