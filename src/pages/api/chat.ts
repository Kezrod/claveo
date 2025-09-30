import type { APIRoute } from "astro";
// ❌ OpenAI deshabilitado temporalmente
// import OpenAI from "openai";

// ❌ Cliente comentado hasta que agreguemos la API key
// const client = new OpenAI({
//   apiKey: import.meta.env.OPENAI_API_KEY,
// });

export const post: APIRoute = async ({ request }) => {
  const { message } = await request.json();

  // 🧪 Respuesta simulada (elimina esto cuando actives OpenAI)
  const reply = `⚠️ Funcionalidad de IA desactivada temporalmente. Tu mensaje fue: "${message}"`;

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

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
