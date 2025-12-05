const axios = require("axios");
require("dotenv").config();

async function chat(req, res) {
  const { message, context = [] } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Google API key not configured" });

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const contents = [
      {
        parts: [
          {
            text:
              "You are a friendly AI fitness coach. Answer fitness, workout, and diet questions concisely in 2–3 sentences."
          }
        ]
      },
      ...context.map(msg => ({
        parts: [{ text: `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}` }]
      })),
      {
        parts: [{ text: `User: ${message}` }]
      }
    ];

    const response = await axios.post(
      geminiEndpoint,
      {
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log("RAW GEMINI RESPONSE >>>", JSON.stringify(response.data, null, 2));

    // FIXED EXTRACTION (correct path)
    const aiReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "AI did not respond.";

    res.json({ reply: aiReply });

  } catch (err) {
    console.error("Gemini Error >>>", err.response?.data || err.message);
    const errorMsg = err.response?.data?.error?.message || err.message;
    res.status(500).json({ error: `Gemini Error: ${errorMsg}` });
  }
}

module.exports = { chat };
