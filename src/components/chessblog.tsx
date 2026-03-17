import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
  type: "standard" | "chess";
}

// ─── Chess Article Data ───────────────────────────────────────────────────────

const chessSections = [
  {
    id: "01",
    title: "Stockfish is not a library",
    content: `Most developers, when they hear "integrate Stockfish," assume there is an npm package somewhere. There is not. Stockfish is a compiled C++ binary — a standalone executable that you run as a separate operating system process. You do not import it. You do not call a function. You spawn it.\n\nThis distinction is load-bearing. The entire integration is built around inter-process communication: your Node.js server starts a child process, writes text commands to its stdin, and reads text responses from its stdout. The protocol that governs this conversation is called UCI — Universal Chess Interface. It is a plain-text, line-based protocol from 2000 that treats the engine like a remote terminal. You send a command, you receive a response. No JSON. No HTTP. Just lines of text going back and forth between two processes.`,
    code: `const { spawn } = require("child_process");
const engine = spawn("./engine/stockfish");

// Send a position and ask for analysis
engine.stdin.write("position fen <FEN>\\n");
engine.stdin.write("go depth 15\\n");

// Engine replies over stdout
engine.stdout.on("data", (data) => {
  console.log(data.toString());
});`,
    uci: {
      send: ["position fen rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", "go depth 15"],
      receive: ["info depth 15 score cp 34 nodes 1284702", "bestmove e7e5 ponder d2d4"],
    },
    note: `The "score cp 34" in the response means the position is evaluated at +34 centipawns — a unit equal to one hundredth of a pawn. Stockfish expresses its opinion about who is winning in this unit system: +100 means one side is up roughly a pawn, +300 means they are up roughly a minor piece. This number is how all the chess math gets communicated back to your application.`,
  },
  {
    id: "02",
    title: "The .exe problem: PE32+ vs ELF",
    content: `The first binary downloaded was the Windows build. It ran immediately on the local machine. Then it was uploaded to the Linux server and nothing worked.\n\nThe reason is not a configuration problem or a missing dependency. It is a binary format mismatch at the operating system level. Windows executes files in the PE32+ format (Portable Executable). Linux executes files in the ELF format (Executable and Linkable Format). These are completely different binary structures with different headers, different section layouts, and different system call conventions. When Linux encounters a PE32+ binary, it does not fail gracefully — it simply refuses to execute it.\n\nThis is why the .exe extension is not cosmetic. It is a signal that the binary was compiled and linked for a different operating system. The fix was to download the Linux build of Stockfish from the official GitHub releases and set the correct permissions.`,
    code: `# Wrong: this is a PE32+ binary
./engine/stockfish.exe  # EACCES or ENOENT

# Correct: download the Linux ELF binary
tar -xf stockfish-ubuntu-x86-64.tar.gz
mv stockfish-ubuntu-x86-64 engine/stockfish
chmod +x engine/stockfish`,
    note: `The chmod +x step is not optional. Linux does not infer executability from the file extension. The executable permission bit must be set explicitly or the OS will refuse to run the file even if it is a perfectly valid ELF binary.`,
  },
  {
    id: "03",
    title: "Getting the binary onto the server",
    content: `Stockfish is approximately 110 megabytes. That is large enough to create real problems with standard deployment workflows.\n\nThe first attempt was a manual upload directly into the project repository. That worked locally but introduced a 110MB binary into version control, which is not sustainable.\n\nThe second attempt was Git LFS (Large File Storage). Git LFS replaces large files with text pointer files and stores the actual content on a separate server. In theory this is the right tool. In practice, the free tier limits and the push overhead made it unreliable for a file this size. The push stalled repeatedly.\n\nThe third approach was a runtime download. The binary was uploaded to Google Drive. At server startup, the application checks whether the binary exists. If it does not, it downloads the file from Drive, handles the redirect through Google's download confirmation page, and streams the bytes to disk.\n\nThe most reliable approach turned out to be downloading directly from the official GitHub releases endpoint during the build step, using curl or wget, extracting the tarball, and placing the binary in the expected path. This is reproducible, fast, and does not depend on a third-party storage account.`,
    code: `async function downloadStockfish() {
  const exists = await fs.access("./engine/stockfish")
    .then(() => true)
    .catch(() => false);

  if (exists) return;

  const url = "https://github.com/official-stockfish/Stockfish/releases/download/sf_17/stockfish-ubuntu-x86-64.tar";
  const response = await axios({ url, responseType: "stream" });
  await pipeline(response.data, fs.createWriteStream("./engine/stockfish.tar"));

  await exec("tar -xf engine/stockfish.tar -C engine/");
  await exec("chmod +x engine/stockfish");
}`,
  },
  {
    id: "04",
    title: "Node version: 0.0.1 away from peace",
    content: `While the backend was being debugged, the frontend build broke without any changes to the frontend code.\n\nThe installed Node version was v22.11.0. Vite 8 ships with Rolldown as its bundler, and Rolldown requires Node >= 22.12.0. The difference is 0.0.1 — a patch version. The build failure error message did not mention the version requirement clearly. It took time to trace the root cause.\n\nThis is a recurring problem with Vite specifically. The project upgrades its dependencies without broadcasting breaking changes in patch releases. A Vite upgrade that pulls in a new minor version of an internal dependency can silently change the minimum Node requirement. The project is not pinned to a specific Vite version by default, so a fresh install can get a newer version than what was tested.\n\nThe fix was upgrading to Node v24 LTS. The broader lesson is that the package.json engines field exists for exactly this reason — specifying the minimum Node version prevents future developers from hitting the same silent incompatibility. This happened while All Too Well (10 Minute Version) was playing. The timing was appropriate.`,
    code: `// In package.json — this field is worth setting
{
  "engines": {
    "node": ">=22.12.0"
  }
}

// The actual version gap that caused the failure:
// Installed:  Node v22.11.0
// Required:   Node v22.12.0  (Vite 8 + Rolldown)
// Solution:   Node v24 LTS`,
  },
  {
    id: "05",
    title: "The engine pool incident",
    content: `The initial architecture included a pool of four Stockfish workers. The reasoning was straightforward: a pool means concurrent requests can be served without queuing. Four workers means four simultaneous analyses. This seemed like reasonable production thinking.\n\nThe pool was deployed to a shared work server.\n\nWithin seconds of the first request, the CPU usage spiked to near 100%. Memory consumption climbed sharply. The server became unresponsive. Four full Stockfish processes had started simultaneously on a machine that was already running other services. Each process is CPU-bound by design — Stockfish uses as many CPU cycles as it can get to search deeper into the position tree. Four of them competing for the same cores on a shared server is not a pool — it is a denial-of-service attack against your own infrastructure.\n\nThe recovery involved SSH access, manual process termination with kill -9, and deleting the deployment. The server took several minutes to stabilize. Other developers using the machine noticed.\n\nThe fix was reducing the pool to a single worker. One Stockfish process, managed carefully, with all requests queued through it. CPU usage became predictable. Memory usage stayed within bounds. The server did not crash again.`,
    code: `// What was deployed — do not do this on shared infrastructure
const pool = new Array(4).fill(null).map(() => new StockfishWorker());

// What should have been deployed from the start
const worker = new StockfishWorker();

// Queue requests through the single worker
async function analyze(fen: string) {
  return new Promise((resolve) => {
    queue.push({ fen, resolve });
    processQueue();
  });
}`,
    warning: "Four Stockfish processes on a shared server will consume all available CPU. This is not a configuration problem — it is working as intended. Stockfish is designed to use every available cycle.",
  },
  {
    id: "06",
    title: "Deployment: port binding and race conditions",
    content: `The Render deployment showed a healthy startup log. The service appeared to be running. Every request returned 502 Bad Gateway.\n\nThe cause was a hardcoded port number. Render assigns a port dynamically at runtime through the PORT environment variable. An application that binds to a fixed port — say, 3000 — is listening on the wrong port. The load balancer forwards requests to the port Render assigned, finds nothing listening there, and returns 502. The application is running correctly; it is just not reachable.\n\nAfter fixing the port, a second class of startup errors appeared: spawn ENOENT when the engine was requested before it had finished downloading. The download function is asynchronous and takes time — the binary is over 100 megabytes. The original code started the engine pool and the HTTP server before the download resolved. Requests that arrived during the startup window tried to spawn a binary that did not exist yet.\n\nThe fix was sequencing: download the binary first, initialize the engine pool second, start the HTTP server last. The server only becomes reachable once the engine is ready.`,
    code: `// Wrong: server starts before engine is ready
initEnginePool();
app.listen(process.env.PORT || 3000);
downloadStockfish();

// Correct: enforce startup order
async function start() {
  await downloadStockfish();   // binary exists
  initEnginePool();            // engine is ready

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(\`Listening on port \${PORT}\`);
  });
}

start();`,
  },
  {
    id: "07",
    title: "Trojans and security notes",
    content: `During development, three trojan alerts were triggered by the local antivirus software. All three were false positives. Stockfish is a large native binary that communicates via process spawning and stdin/stdout redirection — behavior that looks identical to what some malware does. Antivirus heuristics flag it.\n\nThis is worth noting for anyone integrating chess engines or other compiled binaries into web projects: expect security software to object. The binary should be verified against the official SHA-256 hash from the Stockfish releases page before deployment. Do not disable antivirus to make the warning go away — verify the binary instead.`,
    code: `# Verify the binary against the official hash
sha256sum stockfish-ubuntu-x86-64
# Compare against the hash published at
# https://github.com/official-stockfish/Stockfish/releases`,
  },
  {
    id: "08",
    title: "Architecture and final state",
    content: `The final system is simpler than the initial design. One engine. One queue. Requests are processed sequentially rather than concurrently. The performance ceiling is lower but the system is stable and predictable.\n\nStockfish is genuinely expensive to run. Even a single instance will cause CPU usage to climb during analysis. On a small server, analysis requests should be rate-limited and the search depth should be capped — depth 15 is sufficient for most applications, and the CPU cost increases non-linearly as depth increases.\n\nThe future optimization worth exploring is skipping the process entirely. C has direct access to CPU registers, and Stockfish's evaluation logic is ultimately arithmetic on board state. Rewriting the evaluation layer in C and calling it directly from Node via a native addon (N-API) would eliminate the inter-process communication overhead. This is speculative — the UCI protocol overhead is small compared to the search computation — but it is the direction further performance work would go.`,
    stack: {
      frontend: ["react-router-dom", "chess.js", "react-chessboard", "recharts", "lucide-react"],
      backend: ["express", "child_process (Node stdlib)", "axios"],
    },
  },
];

// ─── Blog Post Data ───────────────────────────────────────────────────────────

const blogPosts: BlogPost[] = [
  {
    id: 9,
    title: "Building a Chess Analysis Backend with Stockfish and Node.js",
    excerpt:
      "A 26-hour debugging session across binaries, OS incompatibilities, Node versions, and deployment constraints. Four Stockfish processes nearly took down a shared server. This is what actually happened.",
    author: "Topinns",
    date: "March 17, 2026",
    category: "Engineering",
    readTime: "18 min",
    type: "chess",
  },
  {
    id: 1,
    title: "Fragments of Code, Fragments of Self",
    excerpt:
      "Sometimes I look at old projects and see not just logic, but echoes of who I was at that time — what I feared, what I hoped for, what I believed software could be. Code becomes a diary, even when I never meant it to.",
    author: "Topinns",
    date: "September 20, 2025",
    category: "Reflection",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
  },
  {
    id: 2,
    title: "The Silence Between Deploys",
    excerpt:
      "There's a stillness that lingers right after pushing new changes into the world. It feels like holding your breath, waiting to see if the universe accepts or rejects your offering.",
    author: "Topinns",
    date: "September 15, 2025",
    category: "Philosophy",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
  },
  {
    id: 3,
    title: "When Systems Outlive Their Creators",
    excerpt:
      "I've walked through codebases older than my career, written by hands that may never return. There's a haunting beauty in systems that persist long after the minds that birthed them have moved on.",
    author: "Topinns",
    date: "September 10, 2025",
    category: "Technology",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
  },
  {
    id: 4,
    title: "The Weight of Abandoned Repositories",
    excerpt:
      "Every forgotten GitHub repo feels like a tiny gravestone. They hold experiments that never bloomed, ideas that lost their urgency, versions of ourselves we quietly buried.",
    author: "Topinns",
    date: "September 7, 2025",
    category: "Craft",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
  },
  {
    id: 5,
    title: "Some Nights, the Code Doesn't Save Me",
    excerpt:
      "No clever abstractions, no grand conclusions. Just the quiet admission that some nights, even in front of glowing screens, the loneliness is louder than the syntax.",
    author: "Topinns",
    date: "September 3, 2025",
    category: "Vanity",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
  },
  {
    id: 6,
    title: "Patterns in the Chaos of Frameworks",
    excerpt:
      "New tools rise every month, promising salvation, efficiency, elegance. Most will fade, but hidden beneath the churn are patterns — enduring truths about how humans attempt to tame complexity.",
    author: "Topinns",
    date: "August 29, 2025",
    category: "Technology",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
  },
  {
    id: 7,
    title: "What Truly Is Love?",
    excerpt:
      "Is love letting go, or is it fighting? Does it finish, or does it echo through eternity? For years I have wrestled with these questions, trying to find meaning in the paradox of human affection.",
    author: "Topinns",
    date: "September 25, 2025",
    category: "Philosophy",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
  },
];

const standardContents: Record<number, string> = {
  1: `Opening an old repository feels like flipping through a forgotten journal. Functions are written with a kind of urgency that belonged to a younger me, one who believed elegance was the same thing as worth.\n\nI can see in the indentation where I rushed, in the variable names where I dreamed. A half-finished feature is not just technical debt, but a fossil of my distraction, or perhaps my heartbreak that week.\n\nEvery developer, whether they admit it or not, leaves parts of themselves in the code. Not just algorithms, but anxieties. Not just syntax, but longing.\n\nAnd so, even when a project dies, fragments of me remain there — shadows I did not intend to preserve. Maybe that's what makes revisiting old code both painful and strangely tender. I'm not just debugging programs; I'm debugging myself.`,
  2: `The moment after deployment is a peculiar kind of quiet. You've typed git push, the logs have streamed by, and now you wait.\n\nIt's not really about the code anymore — it's about exposure. Will the users see the update and feel nothing, or will they stumble into a bug you missed?\n\nIn that pause, time stretches. My heartbeat sounds louder than the fan of my machine. I am reminded that software is not a private act. It is a conversation, whether I like it or not.\n\nIf things break, the silence ends with alerts, Slack messages, maybe even blame. If things hold, the silence deepens into something else: a relief so gentle it barely announces itself.\n\nThis is the rhythm of creation in code: the chaos of making, the silence of waiting, the whisper of consequence.`,
  3: `Some systems feel like ruins — still standing, still functional, but clearly belonging to another era. Their patterns are archaic, their dependencies forgotten, their documentation missing.\n\nAnd yet, they work. They carry the weight of countless transactions, decisions, lives.\n\nWhen I step into these codebases, I feel like an archaeologist. Every function call is an inscription. Every hack is a rumor. I'll never know the full story of the people who built them, but I can sense their presence.\n\nMaintenance is not just about keeping systems alive. It's about remembering that behind every enduring architecture was once a mind trying to solve a problem.\n\nTo maintain is to honor. To rewrite is to mourn.`,
  4: `I have dozens of repositories that will never see another commit. Some were prototypes, some were wild ideas, some were fragile bursts of hope.\n\nThey sit in my GitHub like little tombstones, each one a project that carried me for a season and then let me go.\n\nSometimes I wonder: are these failures? Or are they simply traces of growth — projects that taught me something before they became unnecessary?\n\nAbandoned code is heavy because it mirrors the parts of ourselves we've also abandoned. The dreams we had, the energy we've lost, the illusions we've shed.\n\nBut maybe that's what craft really is: not every seed growing into a tree, but every attempt leaving behind something that shaped us, even in silence.`,
  5: `Most nights, I lose myself in code. The logic consumes me, the puzzle distracts me, and the loneliness fades.\n\nBut not always.\n\nSome nights the keystrokes sound hollow. The monitor feels cold. The compiler cannot fix what is broken inside me.\n\nI remind myself that being human is not a bug. That emptiness, too, is part of the design.\n\nAnd on those nights, I close the laptop not as a developer, but as a person — one who needs silence, rest, maybe even someone else's presence more than another line of code.`,
  6: `The tech landscape is a storm of frameworks. React gives way to Svelte, which gives way to the next thing. Each promises to be the future, each gathers disciples, and each eventually fades into the archive.\n\nAt first it feels exhausting — how can we ever keep up? But beneath the churn, there are patterns. Frameworks rise and fall, but the problems remain the same: state, rendering, data flow, human comprehension.\n\nWhat changes is the syntax, the packaging, the story we tell ourselves about control.\n\nThe truth is, frameworks are less about technology and more about our relationship with complexity. They are mirrors of our desires: for order, for clarity, for the illusion that we can outpace complexity.\n\nThe frameworks will keep coming. The patterns will remain.`,
  7: `What truly is love? Is love letting go, or is it fighting? Is it sometimes fighting and other times letting go? Is it about understanding that someone deserves better, and then stepping away? Or is it about the time spent together, or the promise of "till death do us part"?\n\nIs love about being there for someone no matter what, or is it about knowing this person is wrong, and still standing by them? Does love ever truly finish, or does it continue for eternity?\n\nFor the last seven years of my life, I have struggled with this thought process. In the end, how do you really know something is love? Not by the time, not the feelings, not even how much of friends we are.\n\nTo be honest, I don't think I will ever fully understand the feeling. I am just a man, and I am not even very good at being a man yet. I believe understanding quantum mechanics is easier than understanding the concept of human love.\n\nIn the end, love is many things. Love is what carries people to fight wars. Love is what makes people deceive each other. Love is sometimes translated as hatred.\n\nFreud saw love through a different lens — he coined the word ambivalence, trying to explain how we all have both love and hate towards the same person. So, in the end, hate is just the absence of love.\n\nI have been very terrible at expressing love, but in a subtle way I think writing has been the way I've enjoyed expressing it. I think love is about giving, giving in some form or another: giving your time, your emotions, your money, no matter how little it might be.\n\nAnd today, I am expressing my love in a letter. So, this — this is to someone. Or is it?`,
};

// ─── Chess Article Components ─────────────────────────────────────────────────

function UCIExchange({ send, receive }: { send: string[]; receive: string[] }) {
  return (
    <div style={{ marginTop: "16px" }}>
      <div style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#4b5563", fontFamily: "monospace", marginBottom: "6px", textTransform: "uppercase" as const }}>
        UCI exchange
      </div>
      <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ padding: "2px 0", borderBottom: "1px solid #111" }}>
          {send.map((line, i) => (
            <div key={i} style={{ padding: "5px 14px", fontFamily: "monospace", fontSize: "11.5px", color: "#93c5fd", lineHeight: 1.6 }}>
              <span style={{ color: "#374151", marginRight: "10px", userSelect: "none" as const }}>→</span>{line}
            </div>
          ))}
        </div>
        <div style={{ padding: "2px 0" }}>
          {receive.map((line, i) => (
            <div key={i} style={{ padding: "5px 14px", fontFamily: "monospace", fontSize: "11.5px", color: "#4ade80", lineHeight: 1.6 }}>
              <span style={{ color: "#374151", marginRight: "10px", userSelect: "none" as const }}>←</span>{line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ position: "relative", marginTop: "16px" }}>
      <button
        onClick={copy}
        style={{
          position: "absolute", top: "10px", right: "10px",
          background: "#1a1a1a", border: "1px solid #2a2a2a",
          color: copied ? "#4ade80" : "#6b7280",
          fontSize: "10px", fontFamily: "monospace",
          padding: "3px 8px", borderRadius: "3px",
          cursor: "pointer", letterSpacing: "0.05em",
          transition: "color 0.2s", zIndex: 1,
        }}
      >
        {copied ? "COPIED" : "COPY"}
      </button>
      <pre style={{
        background: "#0a0a0a", border: "1px solid #1a1a1a",
        borderRadius: "4px", padding: "16px",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        fontSize: "11.5px", lineHeight: "1.75",
        overflowX: "auto", margin: 0, color: "#d4d4d4", whiteSpace: "pre",
      }}>
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

function ChessArticle() {
  return (
    <div style={{ background: "#050505", color: "#d1d5db", fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      {/* Status tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
        {[
          { label: "Binary format mismatch", color: "#ef4444" },
          { label: "Engine pool incident", color: "#ef4444" },
          { label: "Node 0.0.1 gap", color: "#f59e0b" },
          { label: "Race condition on startup", color: "#f59e0b" },
          { label: "Resolved", color: "#4ade80" },
        ].map(({ label, color }) => (
          <span key={label} style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "#0f0f0f", border: "1px solid #1a1a1a",
            borderRadius: "3px", padding: "4px 10px",
            fontSize: "11px", fontFamily: "monospace", color: "#6b7280",
            letterSpacing: "0.03em",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
            {label}
          </span>
        ))}
      </div>

      {/* Architecture */}
      <div style={{ margin: "0 0 40px", padding: "20px", background: "#080808", border: "1px solid #111", borderRadius: "4px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#374151", fontFamily: "monospace", marginBottom: "16px", textTransform: "uppercase" as const }}>
          Final architecture
        </div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0" }}>
          {["React client", "Express API", "Request queue", "StockfishWorker", "Stockfish (ELF binary)"].map((node, i, arr) => (
            <div key={node} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                padding: "8px 14px",
                background: i === 4 ? "#0f1a0f" : i === 3 ? "#0f0f1a" : "#0f0f0f",
                border: `1px solid ${i === 4 ? "#1a2e1a" : i === 3 ? "#1a1a2e" : "#1a1a1a"}`,
                borderRadius: "3px", fontSize: "11px", fontFamily: "monospace",
                color: i === 4 ? "#4ade80" : i === 3 ? "#818cf8" : "#9ca3af",
                whiteSpace: "nowrap" as const,
              }}>
                {node}
              </div>
              {i < arr.length - 1 && (
                <div style={{ padding: "0 6px", color: "#374151", fontSize: "12px", fontFamily: "monospace" }}>→</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", fontFamily: "monospace", color: "#374151" }}>
          Single engine — sequential queue — no concurrent processes
        </div>
      </div>

      {/* Index */}
      <nav style={{ padding: "0 0 28px", borderBottom: "1px solid #0f0f0f", marginBottom: "8px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#374151", fontFamily: "monospace", marginBottom: "12px", textTransform: "uppercase" as const }}>
          Index
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px" }}>
          {chessSections.map((s) => (
            <button
              key={s.id}
              onClick={() => document.getElementById(`cs-${s.id}`)?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", padding: "5px 0",
                display: "flex", alignItems: "baseline", gap: "10px",
                color: "#4b5563", fontSize: "12px", fontFamily: "monospace",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d1d5db")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
            >
              <span style={{ color: "#6366f1", flexShrink: 0 }}>{s.id}</span>
              <span style={{ lineHeight: 1.4 }}>{s.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Sections */}
      {chessSections.map((section, idx) => (
        <article
          key={section.id}
          id={`cs-${section.id}`}
          style={{ padding: "40px 0", borderBottom: idx < chessSections.length - 1 ? "1px solid #0f0f0f" : "none" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "20px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#6366f1", letterSpacing: "0.1em", marginTop: "5px", flexShrink: 0 }}>
              {section.id}
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#f9fafb", margin: 0, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              {section.title}
            </h3>
          </div>
          <div style={{ paddingLeft: "31px" }}>
            {section.content.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: "14.5px", lineHeight: "1.8", color: "#9ca3af", margin: "0 0 14px" }}>{para}</p>
            ))}
            {"uci" in section && section.uci && (
              <UCIExchange send={section.uci.send} receive={section.uci.receive} />
            )}
            {"note" in section && section.note && (
              <div style={{
                margin: "16px 0", padding: "12px 16px",
                background: "#0a0f0a", border: "1px solid #141e14",
                borderLeft: "2px solid #15803d", borderRadius: "0 3px 3px 0",
                fontSize: "12.5px", lineHeight: "1.7", color: "#6b7280",
              }}>
                {section.note}
              </div>
            )}
            {"warning" in section && section.warning && (
              <div style={{
                margin: "16px 0", padding: "12px 16px",
                background: "#110a0a", border: "1px solid #2a1111",
                borderLeft: "2px solid #b91c1c", borderRadius: "0 3px 3px 0",
                fontSize: "12.5px", lineHeight: "1.7", color: "#6b7280",
              }}>
                <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: "6px" }}>
                  Warning
                </span>
                {section.warning}
              </div>
            )}
            {"code" in section && section.code && <CodeBlock code={section.code} />}
            {"stack" in section && section.stack && (
              <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {Object.entries(section.stack).map(([cat, items]) => (
                  <div key={cat} style={{ background: "#080808", border: "1px solid #111", borderRadius: "4px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#374151", fontFamily: "monospace", marginBottom: "10px", textTransform: "uppercase" as const }}>
                      {cat}
                    </div>
                    {(items as string[]).map((pkg) => (
                      <div key={pkg} style={{ fontSize: "12px", fontFamily: "monospace", color: "#6b7280", padding: "3px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#1f2937" }}>—</span>{pkg}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}

      {/* Footer */}
      <div style={{ paddingTop: "32px", borderTop: "1px solid #0f0f0f", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#374151", fontFamily: "monospace", marginBottom: "8px", textTransform: "uppercase" as const }}>Duration</div>
          <div style={{ fontSize: "28px", fontWeight: 600, fontFamily: "monospace", color: "#f9fafb", letterSpacing: "0.05em" }}>26:00:00</div>
          <div style={{ fontSize: "11px", color: "#374151", fontFamily: "monospace", marginTop: "4px" }}>
            Soundtrack: All Too Well (10 Min Version) — Taylor Swift
          </div>
        </div>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#374151", fontFamily: "monospace", marginBottom: "8px", textTransform: "uppercase" as const }}>Open issues</div>
          {["Rate limiting for analysis requests", "Queue depth monitoring", "C/N-API evaluation path (speculative)"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "3px 0", fontSize: "12px", fontFamily: "monospace", color: "#4b5563" }}>
              <span style={{ color: "#1f2937" }}>○</span>{item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Category badge colors ────────────────────────────────────────────────────

const categoryColors: Record<string, { bg: string; text: string }> = {
  Engineering: { bg: "#0f0f1a", text: "#818cf8" },
  Reflection:  { bg: "#0f1a10", text: "#4ade80" },
  Philosophy:  { bg: "#1a0f0f", text: "#f87171" },
  Technology:  { bg: "#0f1318", text: "#38bdf8" },
  Craft:       { bg: "#16100f", text: "#fb923c" },
  Vanity:      { bg: "#161016", text: "#c084fc" },
};

// ─── Main Blog Component ──────────────────────────────────────────────────────

export default function ChessBlog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const filtered = filter === "All" ? blogPosts : blogPosts.filter((p) => p.category === filter);

  const featured = blogPosts[0]; // Chess article is featured

  // ── Post detail view ──
  if (selectedPost) {
    return (
      <div style={{ background: "#050505", minHeight: "100vh", color: "#d1d5db", fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
        {/* Scanline */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)", opacity: 0.4 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "760px", margin: "0 auto", padding: "0 24px 80px" }}>
          {/* Back */}
          <div style={{ padding: "32px 0 0" }}>
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#4b5563", fontSize: "12px", fontFamily: "monospace",
                letterSpacing: "0.05em", padding: "0", display: "flex", alignItems: "center", gap: "8px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d1d5db")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
            >
              ← back to index
            </button>
          </div>

          {/* Post header */}
          <header style={{ padding: "32px 0 36px", borderBottom: "1px solid #111" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "8px", height: "8px", background: "#6366f1", borderRadius: "2px" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#4b5563", textTransform: "uppercase" as const, fontFamily: "monospace" }}>
                {selectedPost.category}
              </span>
              <span style={{ marginLeft: "auto", fontSize: "11px", letterSpacing: "0.08em", color: "#374151", fontFamily: "monospace" }}>
                {selectedPost.date}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 600, color: "#f9fafb", lineHeight: 1.25, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
              {selectedPost.title}
            </h1>
            <div style={{ display: "flex", gap: "16px", fontSize: "11px", fontFamily: "monospace", color: "#4b5563" }}>
              <span>{selectedPost.author}</span>
              <span style={{ color: "#1f2937" }}>·</span>
              <span>{selectedPost.readTime} read</span>
            </div>
          </header>

          {/* Post body */}
          <div style={{ paddingTop: "36px" }}>
            {selectedPost.type === "chess" ? (
              <ChessArticle />
            ) : (
              <>
                {selectedPost.image && (
                  <div style={{ margin: "0 0 32px", borderRadius: "4px", overflow: "hidden", border: "1px solid #111" }}>
                    <img src={selectedPost.image} alt="" style={{ width: "100%", height: "240px", objectFit: "cover", display: "block", filter: "grayscale(20%) brightness(0.85)" }} />
                  </div>
                )}
                <div>
                  {(standardContents[selectedPost.id] || "").split("\n\n").map((para, i) => (
                    <p key={i} style={{ fontSize: "15px", lineHeight: "1.85", color: "#9ca3af", margin: "0 0 20px" }}>{para}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── List / index view ──
  return (
    <div style={{ background: "#050505", minHeight: "100vh", color: "#d1d5db", fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      {/* Scanline */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)", opacity: 0.4 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Site header */}
        <header style={{ padding: "48px 0 36px", borderBottom: "1px solid #111", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "8px", height: "8px", background: "#6366f1", borderRadius: "2px" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#374151", textTransform: "uppercase" as const, fontFamily: "monospace" }}>
                topinns.dev
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "#f9fafb", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Engineering Log
            </h1>
            <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#4b5563", fontFamily: "monospace" }}>
              {blogPosts.length} entries · Topinns
            </p>
          </div>
          <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#1f2937", textAlign: "right" as const }}>
            <div style={{ color: "#374151", marginBottom: "2px" }}>Last updated</div>
            <div>March 17, 2026</div>
          </div>
        </header>

        {/* Category filter */}
        <div style={{ padding: "20px 0", borderBottom: "1px solid #0f0f0f", display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? "#0f0f1a" : "none",
                border: `1px solid ${filter === cat ? "#1a1a2e" : "#111"}`,
                color: filter === cat ? "#818cf8" : "#4b5563",
                fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.05em",
                padding: "4px 12px", borderRadius: "3px", cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { if (filter !== cat) (e.currentTarget.style.color = "#9ca3af"); }}
              onMouseLeave={(e) => { if (filter !== cat) (e.currentTarget.style.color = "#4b5563"); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {filter === "All" && (
          <div
            onClick={() => setSelectedPost(featured)}
            style={{
              margin: "32px 0 0", padding: "28px", cursor: "pointer",
              background: "#080808", border: "1px solid #1a1a2e",
              borderRadius: "4px", transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a4e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#1a1a2e")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#6366f1", fontFamily: "monospace", textTransform: "uppercase" as const }}>
                Latest
              </span>
              <span style={{ padding: "2px 8px", background: categoryColors["Engineering"].bg, color: categoryColors["Engineering"].text, fontSize: "10px", fontFamily: "monospace", borderRadius: "3px", letterSpacing: "0.05em" }}>
                Engineering
              </span>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#f9fafb", margin: "0 0 12px", lineHeight: 1.3, letterSpacing: "-0.015em" }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: "1.7", margin: "0 0 20px" }}>
              {featured.excerpt}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "11px", fontFamily: "monospace", color: "#374151" }}>
              <span>{featured.author}</span>
              <span>·</span>
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime} read</span>
              <span style={{ marginLeft: "auto", color: "#6366f1" }}>read →</span>
            </div>
          </div>
        )}

        {/* Post grid */}
        <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "#0f0f0f", border: "1px solid #0f0f0f", borderRadius: "4px", overflow: "hidden" }}>
          {(filter === "All" ? filtered.slice(1) : filtered).map((post) => {
            const cc = categoryColors[post.category] || { bg: "#0f0f0f", text: "#6b7280" };
            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                style={{
                  padding: "22px 20px", cursor: "pointer",
                  background: "#080808", transition: "background 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#0d0d0d")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#080808")}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ padding: "2px 8px", background: cc.bg, color: cc.text, fontSize: "10px", fontFamily: "monospace", borderRadius: "3px", letterSpacing: "0.05em" }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#e5e7eb", margin: "0 0 8px", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.65", margin: "0 0 14px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                  {post.excerpt}
                </p>
                <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>{post.date}</div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer style={{ marginTop: "60px", paddingTop: "24px", borderTop: "1px solid #0f0f0f", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "6px", height: "6px", background: "#6366f1", borderRadius: "1px" }} />
            <span style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.12em", color: "#374151", textTransform: "uppercase" as const }}>
              topinns.dev
            </span>
          </div>
          <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#1f2937" }}>
            {blogPosts.length} posts · {new Set(blogPosts.map((p) => p.category)).size} categories
          </span>
        </footer>
      </div>
    </div>
  );
}