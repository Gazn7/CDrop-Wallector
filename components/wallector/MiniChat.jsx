"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { localSearch, localLead, formatPrice } from "../../lib/intent-matcher";

function ResultCard({ item }) {
  return (
    <div className="chat-result">
      <div className="chat-result-thumb">
        <img src={item.img} alt={item.title} />
      </div>
      <div className="chat-result-title">{item.title}</div>
      <div className="chat-result-meta">
        <span>{item.technique.split(",")[0]}</span>
        <b>{formatPrice(item.price)}</b>
      </div>
    </div>
  );
}

function Bubble({ children, who }) {
  return <div className={`bubble ${who}`}>{children}</div>;
}

const API_TIMEOUT_MS = 4500;

export default function MiniChat({ compact = false, suggestions, placeholder }) {
  const initialBot = compact
    ? "Try me. Ask in plain English: \"show me horses,\" \"something blue and moody,\" \"under 500 EUR.\""
    : "Hey. I'm Wallector. Ask me anything about the catalog. I read intent, not keywords.";

  const [messages, setMessages] = useState([{ who: "bot", text: initialBot, intro: true }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, busy]);

  async function ask(q) {
    if (!q.trim() || busy) return;
    const history = messages.filter((m) => !m.intro);
    setMessages((prev) => [...prev, { who: "user", text: q }]);
    setInput("");
    setBusy(true);

    const items = localSearch(q, history);
    let reply = localLead(q);

    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), API_TIMEOUT_MS)
      );
      const fetchCall = fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, items, history: [], isHelp: false }),
      }).then((res) => {
        if (!res.ok) throw new Error(`http_${res.status}`);
        return res.json();
      });

      const data = await Promise.race([fetchCall, timeout]);
      if (data.reply) reply = data.reply;
    } catch {
      // fallback: localLead reply already set above
    }

    setMessages((prev) => [...prev, { who: "bot", text: reply, items }]);
    setBusy(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    ask(input);
  }

  const sugg = suggestions || [
    "Show me horses",
    "Something blue and moody",
    "Under 500 EUR",
    "Classical etchings"
  ];

  return (
    <div className="chat" role="region" aria-label="Wallector live demo">
      <div className="chat-bar">
        <span className="dot" />
        <span>Wallector · ChatGPT app</span>
        <span className="pill">Live</span>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <Fragment key={i}>
            {m.who === "bot" && !m.intro && <div className="bot-label">Wallector</div>}
            <Bubble who={m.who}>
              {m.who === "bot" && m.intro && <div className="bot-label">Wallector</div>}
              <span>{m.text}</span>
              {m.items && (
                <div className="chat-results">
                  {m.items.map((it) => (
                    <ResultCard key={it.id} item={it} />
                  ))}
                </div>
              )}
            </Bubble>
          </Fragment>
        ))}
        {busy && (
          <Bubble who="bot">
            <div className="bot-label">Wallector</div>
            <div className="typing">
              <span />
              <span />
              <span />
            </div>
          </Bubble>
        )}
      </div>

      <div className="chat-suggestions">
        {sugg.map((s) => (
          <button key={s} className="chat-suggestion" onClick={() => ask(s)} disabled={busy}>
            {s}
          </button>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={onSubmit}>
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder || "Ask the catalog anything…"}
          disabled={busy}
        />
        <button
          type="submit"
          className="chat-send"
          disabled={busy || !input.trim()}
          aria-label="Send"
        >
          ↑
        </button>
      </form>
    </div>
  );
}
