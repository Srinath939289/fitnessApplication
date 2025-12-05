import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    const context = messages; // send full conversation as context
    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message, context });
      return res.data.reply;
    } catch (err) {
      console.error(err);
      return "Error connecting to AI.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    const reply = await sendMessage(input);
    const aiMsg = { sender: "ai", text: reply };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="chatbot-container" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div className="messages-area" style={{ minHeight: "300px", border: "1px solid #ccc", padding: "10px", overflowY: "auto" }}>
        {messages.length === 0 && <p className="welcome-msg">Hi! Ask me anything about fitness, diet, or workouts.</p>}
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`} style={{ margin: "5px 0" }}>
            <strong>{m.sender === "user" ? "You" : "AI Coach"}: </strong>
            {m.text}
          </div>
        ))}
        {loading && <div className="message ai">AI is thinking...</div>}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form" style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          disabled={loading}
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
