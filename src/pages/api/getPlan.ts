import type { APIRoute } from "astro";
import { connectDB } from "../../lib/db";
import { User } from "../../lib/User";

export const get: APIRoute = async ({ request }) => {
  await connectDB();
  const email = new URL(request.url).searchParams.get("email");

  if (!email) return new Response("Email requerido", { status: 400 });

  const user = await User.findOne({ email });
  if (!user) return new Response("Usuario no encontrado", { status: 404 });

  return new Response(JSON.stringify({ plan: user.plan, subscriptionExpires: user.subscriptionExpires }), { status: 200 });
};
