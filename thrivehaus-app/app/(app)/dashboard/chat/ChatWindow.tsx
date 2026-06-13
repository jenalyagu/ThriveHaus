"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

const STARTERS = [
  "Walk me through my Family Blueprint.",
  "My toddler won't sleep and I'm exhausted. Help.",
  "How do I build more support around me this week?",
  "I feel like I'm drowning. What do I do first?",
];

interface ChatWindowProps {
  familyId: string;
  firstName: string;
  initialMessages: Message[];
}

export default function ChatWindow({ firstName, initialMessages }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);

    // Placeholder for streaming assistant response
    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: err.error || "Something went wrong. Please try again." },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: accumulated },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Connection lost. Please try again." },
      ]);
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div
        className="px-6 py-4 border-b shrink-0"
        style={{ borderColor: "var(--color-sand)" }}
      >
        <p className="section-tag mb-0">Village AI</p>
        <h1 className="font-serif text-2xl font-light" style={{ color: "var(--color-charcoal)" }}>
          Your Family Guide
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
          Knows your family · Available 24/7 · Not a substitute for professional support
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center pb-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)" }}
            >
              🏡
            </div>
            <div>
              <p className="font-serif text-xl mb-1" style={{ color: "var(--color-charcoal)" }}>
                {firstName ? `Hi ${firstName} — I'm your Family Guide.` : "Hi — I'm your Family Guide."}
              </p>
              <p className="text-sm max-w-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
                I know your family. Ask me anything — from surviving the newborn phase to building your village.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 rounded-xl border text-sm transition-all"
                  style={{
                    borderColor: "var(--color-sand)",
                    backgroundColor: "white",
                    color: "var(--color-charcoal)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-terracotta)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "color-mix(in srgb, var(--color-terracotta) 5%, white)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-sand)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "white";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mr-3 mt-1"
                    style={{ backgroundColor: "var(--color-forest)", color: "var(--color-cream)" }}
                  >
                    🏡
                  </div>
                )}
                <div
                  className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? {
                          backgroundColor: "var(--color-charcoal)",
                          color: "var(--color-cream)",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          backgroundColor: "white",
                          color: "var(--color-charcoal)",
                          border: "1px solid var(--color-sand)",
                          borderBottomLeftRadius: "4px",
                        }
                  }
                >
                  {msg.content === "" && streaming && i === messages.length - 1 ? (
                    <span className="flex items-center gap-1.5">
                      <Spinner size="sm" />
                      <span style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                        Thinking…
                      </span>
                    </span>
                  ) : (
                    <MessageContent content={msg.content} />
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div
        className="px-6 py-4 border-t shrink-0"
        style={{ borderColor: "var(--color-sand)", backgroundColor: "var(--color-cream)" }}
      >
        <div
          className="flex items-end gap-3 rounded-2xl border px-4 py-3 transition-all"
          style={{ borderColor: "var(--color-sand)", backgroundColor: "white" }}
        >
          <textarea
            ref={inputRef}
            className="flex-1 resize-none bg-transparent text-sm outline-none font-sans leading-relaxed"
            style={{ color: "var(--color-charcoal)", maxHeight: "120px", minHeight: "24px" }}
            placeholder="Ask anything about your family…"
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
            }}
            onKeyDown={handleKeyDown}
            disabled={streaming}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || streaming}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: input.trim() && !streaming ? "var(--color-terracotta)" : "var(--color-sand)",
              color: input.trim() && !streaming ? "white" : "color-mix(in srgb, var(--color-charcoal) 40%, transparent)",
            }}
          >
            {streaming ? <Spinner size="sm" /> : <Send size={14} />}
          </button>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 30%, transparent)" }}>
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Render markdown-lite: bold, line breaks
  const lines = content.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        if (!line) return <br key={i} />;
        // Bold: **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className={i > 0 ? "mt-2" : ""}>
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j}>{part.slice(2, -2)}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </>
  );
}
