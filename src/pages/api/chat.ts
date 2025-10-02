import type { APIRoute } from "astro";
import { connectDB } from "../../lib/db";
import { User } from "../../lib/User";

// ❌ OpenAI sigue deshabilitado temporalmente
// import OpenAI from "openai";
// const client = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

export const post: APIRoute = async ({ request }) => {
  await connectDB();

  const { email, message } = await request.json();

  if (!email || !message) {
    return new Response(JSON.stringify({ error: "Faltan datos: email o mensaje." }), {
      status: 400,
    });
  }

  // 🔎 Buscar usuario
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado." }), { status: 404 });
  }

  // 📊 Verificación del plan y límites
  if (user.plan === "free") {
    const consultasHoy = user.history.filter(
      (q) => new Date(q.createdAt).toDateString() === new Date().toDateString()
    ).length;

    if (consultasHoy >= 10) {
      return new Response(
        JSON.stringify({
          error:
            "Has alcanzado el límite diario de 10 consultas del plan Free. Mejora tu plan para seguir usando el servicio.",
          plan: user.plan,
        }),
        { status: 403 }
      );
    }
  }

  // 🧪 Respuesta simulada (mientras OpenAI esté desactivado)
  const reply = `⚠️ Funcionalidad de IA desactivada. Tu mensaje fue: "${message}". Plan actual: ${user.plan}`;

  // ❌ Código original comentado temporalmente:
  /*
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente especializado en devolver claves SAT de productos y servicios. " +
          "Cuando el usuario describa un producto, responde con la clave SAT correspondiente y su descripción.",
      },
      { role: "user", content: message },
    ],
  });

  const reply = completion.choices[0].message?.content || "No encontré una respuesta.";
  */

  // 📚 Guardar en el historial del usuario
  user.history.push({
    query: message,
    response: reply,
    createdAt: new Date(),
  });
  await user.save();

  return new Response(JSON.stringify({ reply, plan: user.plan }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
