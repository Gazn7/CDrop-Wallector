/* global React */
const { useState, useEffect, useRef } = React;

// Fake catalog used by the chat demo (Claude searches by intent over this)
const CATALOG = [
  { id: 'A-3920', title: 'Nocturne in Blue', artist: 'Whistler (after)', technique: 'Etching', period: '1875-1899', price: 480, tags: ['blue','night','landscape','moody','ocean','calm'], img: 'assets/widget-1.jpg' },
  { id: 'B-1042', title: 'Last Passion of Torquemada', artist: 'Louis Touchagues', technique: 'Lithograph, Watercolour', period: '1930s', price: 620, tags: ['figurative','surreal','interior','beige','expressive','crowd'], img: 'assets/widget-2.jpg' },
  { id: 'C-2218', title: 'Horse Carousel', artist: 'Gianni Testa', technique: 'Screenprint', period: '1990s', price: 290, tags: ['horse','color','vivid','red','animal','motion'], img: 'assets/widget-3.jpg' },
  { id: 'D-7711', title: 'Portrait of the Painter', artist: 'Jacob Gole (after Rembrandt)', technique: 'Etching', period: '1650-1699', price: 750, tags: ['portrait','dark','classical','figure','baroque'], img: 'assets/widget-1.jpg' },
  { id: 'E-3301', title: 'Roman Equestrian Study', artist: 'Anonymous', technique: 'Etching', period: '18th c.', price: 200, tags: ['horse','classical','sketch','beige','figure'], img: 'assets/widget-3.jpg' },
  { id: 'F-9082', title: 'Provence Interior', artist: 'A. Mansart', technique: 'Lithograph', period: '1920s', price: 340, tags: ['interior','beige','figurative','warm','calm'], img: 'assets/widget-2.jpg' },
  { id: 'G-4501', title: 'Sea at Dusk', artist: 'M. Arnoux', technique: 'Aquatint', period: '1900s', price: 410, tags: ['blue','ocean','landscape','calm','moody'], img: 'assets/widget-1.jpg' },
  { id: 'H-6620', title: 'Wild Horses (red plate)', artist: 'A. Pagliacci', technique: 'Oil on paper', period: '1973', price: 1600, tags: ['horse','color','vivid','animal','motion','red'], img: 'assets/widget-3.jpg' },
];

function fmt(n) { return n.toLocaleString('en-US') + ' EUR'; }

// Local intent matcher: instant fallback before/after Claude
function localSearch(query, history = []) {
  const q = (query || '').toLowerCase();
  const ctx = history.map(h => (h.text || '').toLowerCase()).join(' ');
  const text = q + ' ' + ctx;
  const want = (...kw) => kw.some(k => text.includes(k));
  let pool = CATALOG.slice();
  if (want('horse','equestr')) pool = pool.filter(c => c.tags.includes('horse'));
  if (want('blue','ocean','sea','water','night')) pool = pool.filter(c => c.tags.some(t => ['blue','ocean','night','moody'].includes(t)));
  if (want('portrait','face','person')) pool = pool.filter(c => c.tags.includes('portrait') || c.tags.includes('figure'));
  if (want('cheap','affordable','budget','under','less')) pool = pool.sort((a,b) => a.price - b.price);
  if (want('expensive','premium','high-end','over')) pool = pool.sort((a,b) => b.price - a.price);
  if (want('etch')) pool = pool.filter(c => /etching/i.test(c.technique));
  if (want('color','vivid','bright','red')) pool = pool.filter(c => c.tags.includes('color') || c.tags.includes('vivid') || c.tags.includes('red'));
  if (want('classical','old','antique','baroque','rembrandt')) pool = pool.filter(c => /16|17|18/.test(c.period) || c.tags.includes('classical'));
  if (pool.length === 0) pool = CATALOG.slice(0, 3);
  return pool.slice(0, 3);
}

// Build a punchy lead sentence locally to display while Claude (optional) thinks
function localLead(query) {
  const q = (query || '').toLowerCase();
  if (/horse|equestr/.test(q)) return 'Found a few horses in the catalog. Three picks below.';
  if (/blue|ocean|sea|water|night|moody/.test(q)) return 'Here are some moodier, blue-leaning works.';
  if (/portrait|face|person/.test(q)) return 'A few portraits worth a look.';
  if (/cheap|under|budget|affordable/.test(q)) return 'Sorted by price. Lowest first.';
  if (/etch/.test(q)) return 'Filtered to etchings only.';
  if (/classical|antique|old|baroque|rembrandt/.test(q)) return 'Pulled from the older inventory (pre-1900).';
  return 'Three picks based on your prompt.';
}

function ResultCard({ item }) {
  return (
    <div className="chat-result">
      <div className="chat-result-thumb"><img src={item.img} alt={item.title} /></div>
      <div className="chat-result-title">{item.title}</div>
      <div className="chat-result-meta"><span>{item.technique.split(',')[0]}</span><b>{fmt(item.price)}</b></div>
    </div>
  );
}

function Bubble({ children, who }) {
  return <div className={`bubble ${who}`}>{children}</div>;
}

function MiniChat({ compact = false, suggestions, placeholder }) {
  const initialBot = compact
    ? "Try me. Ask in plain English: \"show me horses,\" \"something blue and moody,\" \"under 500 EUR.\""
    : "Hey. I'm Wallector. Ask me anything about the catalog. I read intent, not keywords.";

  const [messages, setMessages] = useState([
    { who: 'bot', text: initialBot, intro: true }
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, busy]);

  async function ask(q) {
    if (!q.trim() || busy) return;
    const history = messages.filter(m => !m.intro);
    setMessages(prev => [...prev, { who: 'user', text: q }]);
    setInput('');
    setBusy(true);

    // 1. Instant local results so it feels snappy
    const localItems = localSearch(q, history);
    const lead = localLead(q);

    // 2. Try Claude for a richer reply, fall back to local if anything fails
    let reply = lead;
    try {
      const items = localItems.map(i => `- ${i.title} by ${i.artist}, ${i.technique}, ${i.period}, ${i.price} EUR`).join('\n');
      const isHelp = /aiutami|aiuto|help me|don'?t know|no idea|sorprendimi|surprise|stuck|idee/i.test(q);
      const prompt = isHelp
        ? `You are Wallector, a punchy AI search agent embedded in a fine-art marketplace ChatGPT app. The shopper said: "${q}" and they're stuck. Reply in their language (detect from the message). Give ONE short sentence (max 25 words) offering three angles to start: a mood, a price band, and a technique. Friendly, slightly cheeky. No lists, no greetings, just one line ending with a question mark.`
        : `You are Wallector, a punchy AI search agent embedded in a fine-art marketplace ChatGPT app. The shopper just said: "${q}". Here are the 3 catalog matches our search returned:\n${items}\n\nWrite a single short reply (max 30 words, one sentence ideally, no lists, no greetings). Confident, friendly, slightly cheeky. Mention what you picked or why. Don't list prices.`;
      const out = await Promise.race([
        window.claude.complete(prompt),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 4500))
      ]);
      if (out && typeof out === 'string') reply = out.trim().replace(/^["']|["']$/g, '');
    } catch (e) {
      // keep local lead
    }

    setMessages(prev => [...prev, { who: 'bot', text: reply, items: localItems }]);
    setBusy(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    ask(input);
  }

  const sugg = suggestions || [
    'Show me horses',
    'Something blue and moody',
    'Under 500 EUR',
    'Classical etchings',
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
          <React.Fragment key={i}>
            {m.who === 'bot' && !m.intro && <div className="bot-label">Wallector</div>}
            <Bubble who={m.who}>
              {m.who === 'bot' && m.intro && <div className="bot-label">Wallector</div>}
              <span>{m.text}</span>
              {m.items && (
                <div className="chat-results">
                  {m.items.map(it => <ResultCard key={it.id} item={it} />)}
                </div>
              )}
            </Bubble>
          </React.Fragment>
        ))}
        {busy && (
          <Bubble who="bot">
            <div className="bot-label">Wallector</div>
            <div className="typing"><span/><span/><span/></div>
          </Bubble>
        )}
      </div>

      <div className="chat-suggestions">
        {sugg.map(s => (
          <button key={s} className="chat-suggestion" onClick={() => ask(s)} disabled={busy}>{s}</button>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={onSubmit}>
        <input
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder || "Ask the catalog anything…"}
          disabled={busy}
        />
        <button type="submit" className="chat-send" disabled={busy || !input.trim()} aria-label="Send">
          ↑
        </button>
      </form>
    </div>
  );
}

window.MiniChat = MiniChat;
window.CATALOG = CATALOG;
