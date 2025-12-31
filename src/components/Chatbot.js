import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const notifySound = useRef(null);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋, How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const playSound = useCallback(() => {
    if (soundEnabled && notifySound.current) {
      notifySound.current.currentTime = 0;
      notifySound.current.play().catch(() => {});
    }
  }, [soundEnabled]);

  useEffect(() => {
    const unlockSound = () => {
      setSoundEnabled(true);
      window.removeEventListener("click", unlockSound);
    };
    window.addEventListener("click", unlockSound);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      playSound();
    }, 3000);

    return () => clearTimeout(timer);
  }, [playSound]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post(
          "https://smart-medical-chatbot.onrender.com/chat",
       {
        message: userMsg.text
      });

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: res.data.reply }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error" }
      ]);
    }
  };

  return (
    <>
      <audio ref={notifySound} src="/notify.mp3" preload="auto" />

      <div
        className="chatbot-bubble"
        onClick={() => {
          setOpen(true);
          playSound();
        }}
      >
        🤖
        <div className="chatbot-tooltip">Need help?</div>
      </div>

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            MediBot
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

