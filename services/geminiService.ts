import { GoogleGenAI, Modality } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API_KEY is not set. Mocking AI responses or failing gracefully.");
        // In a real app, you might throw or handle this. For this demo, we'll return null to signal UI to disable AI features or show error.
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const generateSummary = async (text: string): Promise<string> => {
    const client = getClient();
    if (!client) return "AI services are unavailable (Missing API Key).";

    try {
        const response = await client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Provide a concise, journalistic summary (max 3 sentences) of the following text, focusing on the key "so what?":\n\n${text}`,
            config: {
                systemInstruction: "You are a senior editor for a premium news outlet. Your tone is professional, sharp, and objective.",
            }
        });
        return response.text || "Could not generate summary.";
    } catch (error) {
        console.error("Gemini Summary Error:", error);
        return "Error generating summary. Please try again.";
    }
};

export const chatWithAI = async (message: string, history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
    const client = getClient();
    if (!client) return "AI services are unavailable.";

    try {
        // We use gemini-3-pro-preview for high quality reasoning in chat
        const chat = client.chats.create({
            model: 'gemini-3-pro-preview',
            history: history,
            config: {
                systemInstruction: "You are the AI assistant for TUN.UZ, a premium Uzbek media platform. You are helpful, knowledgeable, and polite. You answer questions about news, culture, and technology relevant to Uzbekistan and the world. Keep answers concise.",
            }
        });
        
        const response = await chat.sendMessage({ message });
        return response.text || "I didn't catch that.";
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "I'm having trouble connecting right now.";
    }
};

export const generateArticleAudio = async (text: string): Promise<ArrayBuffer | null> => {
    const client = getClient();
    if (!client) return null;

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash-preview-tts',
            contents: `Read this news excerpt calmly and professionally: ${text.substring(0, 400)}...`, // Limit length for demo
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // 'Kore' is usually good for neutral/deep
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
             const binaryString = atob(base64Audio);
             const len = binaryString.length;
             const bytes = new Uint8Array(len);
             for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
             }
             return bytes.buffer;
        }
        return null;
    } catch (error) {
        console.error("Gemini TTS Error:", error);
        return null;
    }
};

export const getTrendingTopics = async (): Promise<string[]> => {
    const client = getClient();
    if (!client) return ["AI in Central Asia", "Sustainable Cotton", "Digital Som", "Tourism Growth"];

    try {
         const response = await client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "What are the top 5 trending news topics related to technology and economy in Central Asia right now?",
            config: {
                tools: [{ googleSearch: {} }] // Use search grounding
            }
        });
        
        // Simple parsing or fallback
        const lines = response.text?.split('\n').filter(l => l.trim().length > 0).slice(0, 5) || [];
        return lines.length > 0 ? lines : ["AI in Central Asia", "Sustainable Cotton", "Digital Som", "Tourism Growth"];
    } catch (e) {
        return ["AI in Central Asia", "Sustainable Cotton", "Digital Som", "Tourism Growth"];
    }
}
