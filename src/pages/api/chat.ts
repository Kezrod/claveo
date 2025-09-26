    import type { APIRoute } from "astro";
    import OpenAI from "openai";

    import fs from "fs";
    import path from "path";

    const csvPath = path.join(process.cwd(), "src", "data", "claves.csv");
    const csvData = fs.readFileSync(csvPath, "utf-8");

    const client = new OpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY, // asegúrate de tenerlo en .env
    });

    export const post: APIRoute = async ({ request }) => {
    const { message } = await request.json();

    // Llamada al modelo de OpenAI
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini", // o el que uses
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

    return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
