import { useState } from "react";

export default function Chat() {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Añadir mensaje del usuario al chat
        setMessages((prev) => [...prev, { role: "user", content: input }]);

        try {
        // Llamada a tu endpoint backend (API route en Astro)
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });

        const data = await res.json();

        // Añadir respuesta del asistente
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } catch (err) {
        console.error(err);
        }

        setInput("");
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 border rounded-lg shadow">
        <div className="h-64 overflow-y-auto bg-gray-50 p-2 mb-4 rounded">
            {messages.length === 0 ? (
            <p className="text-gray-400 italic">Aquí aparecerán las respuestas...</p>
            ) : (
            messages.map((m, i) => (
                <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <span
                    className={`inline-block px-3 py-2 rounded-lg ${
                    m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    {m.content}
                </span>
                </div>
            ))
            )}
        </div>
        <div className="flex gap-2">
            <input
            type="text"
            className="flex-1 border rounded px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Enviar
            </button>
        </div>
        </div>
    );
}
