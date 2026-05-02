import { CATALOG } from "./catalog";

export function localSearch(query, history = []) {
  const q = (query || "").toLowerCase();
  const ctx = history.map((h) => (h.text || "").toLowerCase()).join(" ");
  const text = q + " " + ctx;
  const want = (...kw) => kw.some((k) => text.includes(k));

  let pool = CATALOG.slice();
  if (want("horse", "equestr")) pool = pool.filter((c) => c.tags.includes("horse"));
  if (want("blue", "ocean", "sea", "water", "night"))
    pool = pool.filter((c) => c.tags.some((t) => ["blue", "ocean", "night", "moody"].includes(t)));
  if (want("portrait", "face", "person"))
    pool = pool.filter((c) => c.tags.includes("portrait") || c.tags.includes("figure"));
  if (want("cheap", "affordable", "budget", "under", "less")) pool = pool.sort((a, b) => a.price - b.price);
  if (want("expensive", "premium", "high-end", "over")) pool = pool.sort((a, b) => b.price - a.price);
  if (want("etch")) pool = pool.filter((c) => /etching/i.test(c.technique));
  if (want("color", "vivid", "bright", "red"))
    pool = pool.filter((c) => c.tags.includes("color") || c.tags.includes("vivid") || c.tags.includes("red"));
  if (want("classical", "old", "antique", "baroque", "rembrandt"))
    pool = pool.filter((c) => /16|17|18/.test(c.period) || c.tags.includes("classical"));

  if (pool.length === 0) pool = CATALOG.slice(0, 3);
  return pool.slice(0, 3);
}

export function localLead(query) {
  const q = (query || "").toLowerCase();
  if (/horse|equestr/.test(q)) return "Found a few horses in the catalog. Three picks below.";
  if (/blue|ocean|sea|water|night|moody/.test(q)) return "Here are some moodier, blue-leaning works.";
  if (/portrait|face|person/.test(q)) return "A few portraits worth a look.";
  if (/cheap|under|budget|affordable/.test(q)) return "Sorted by price. Lowest first.";
  if (/etch/.test(q)) return "Filtered to etchings only.";
  if (/classical|antique|old|baroque|rembrandt/.test(q))
    return "Pulled from the older inventory (pre-1900).";
  return "Three picks based on your prompt.";
}

export function formatPrice(n) {
  return n.toLocaleString("en-US") + " EUR";
}
