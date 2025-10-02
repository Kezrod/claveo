import type { APIRoute } from "astro";
import { connectDB } from "../../lib/db";
import { User } from "../../lib/User";

export const post: APIRoute = async ({ request }) => {
  try {
    await connectDB();
    const { email, plan } = await request.json();

    if (!["pro", "xl"].includes(plan)) {
      return new Response(JSON.stringify({ error: "Plan inválido" }), { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        plan,
        subscriptionActive: true,
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días simulados
      },
      { new: true }
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: `✅ Plan actualizado a ${plan}`, user }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error al actualizar el plan" }), { status: 500 });
  }
};

