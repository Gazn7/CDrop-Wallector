import OpenAI from "openai";
import { NextResponse } from "next/server";

// In-memory rate limit: best-effort (resets across Vercel function invocations)
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const HELP_RE = /aiutami|aiuto|help me|don'?t know|no idea|stuck|idee|sorprendimi/i;

function buildPrompt(query, items, isHelp) {
  if (isHelp) {
    return `You are Wallector, a punchy AI art search agent. The user seems stuck or wants inspiration. Reply in their language. Give ONE short sentence (max 25 words) offering three angles: mood, price, technique. End with a question mark.

User said: "${query}"`;
  }

  const itemList = items.length
    ? items.map((it) => `${it.title} by ${it.artist} — ${it.technique}, ${it.period}, ${it.price} EUR`).join("; ")
    : "no specific matches found";

  return `You are Wallector, a punchy AI art search agent embedded in a ChatGPT app. The shopper said: "${query}". Catalog matches: ${itemList}. Write a single short reply (max 30 words, no lists, no greetings). Confident, friendly, slightly cheeky. Mention what you picked or why.`;
}

export async function POST(req) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { query = "", items = [], isHelp = false } = body;

  if (!query.trim()) {
    return NextResponse.json({ error: "empty_query" }, { status: 400 });
  }

  const detectedHelp = isHelp || HELP_RE.test(query);
  const prompt = buildPrompt(query, items, detectedHelp);

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 80,
      temperature: 0.6,
    });

    const reply = completion.choices[0]?.message?.content?.trim() || "";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err?.message);
    return NextResponse.json({ error: "openai_error" }, { status: 502 });
  }
}
