// blogData.ts

export interface ChessSection {
  id: string;
  title: string;
  content: string;
  code?: string;
  uci?: { send: string[]; receive: string[] };
  note?: string;
  warning?: string;
  stack?: { frontend: string[]; backend: string[] };
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  content: string;
  category: string;
  readTime: string;
  image?: string;
  images?: string[];
  type?: "standard" | "chess";
  chessSections?: ChessSection[];
}

export const chessSections: ChessSection[] = [
  {
    id: "01",
    title: "Stockfish is not a library",
    content: `Most developers, when they hear "integrate Stockfish," assume there is an npm package somewhere. There is not. Stockfish is a compiled C++ binary — a standalone executable that you run as a separate operating system process. You do not import it. You do not call a function. You spawn it.

This distinction is load-bearing. The entire integration is built around inter-process communication: your Node.js server starts a child process, writes text commands to its stdin, and reads text responses from its stdout. The protocol that governs this conversation is called UCI — Universal Chess Interface. It is a plain-text, line-based protocol from 2000 that treats the engine like a remote terminal. You send a command, you receive a response. No JSON. No HTTP. Just lines of text going back and forth between two processes.`,
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
      send: [
        "position fen rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
        "go depth 15"
      ],
      receive: [
        "info depth 15 score cp 34 nodes 1284702",
        "bestmove e7e5 ponder d2d4"
      ]
    },
    note: `The "score cp 34" in the response means the position is evaluated at +34 centipawns — a unit equal to one hundredth of a pawn. Stockfish expresses its opinion about who is winning in this unit system: +100 means one side is up roughly a pawn, +300 means they are up roughly a minor piece. This number is how all the chess math gets communicated back to your application.`
  },
  {
    id: "02",
    title: "The .exe problem: PE32+ vs ELF",
    content: `The first binary downloaded was the Windows build. It ran immediately on the local machine. Then it was uploaded to the Linux server and nothing worked.

The reason is not a configuration problem or a missing dependency. It is a binary format mismatch at the operating system level. Windows executes files in the PE32+ format (Portable Executable). Linux executes files in the ELF format (Executable and Linkable Format). These are completely different binary structures with different headers, different section layouts, and different system call conventions. When Linux encounters a PE32+ binary, it does not fail gracefully — it simply refuses to execute it.

This is why the .exe extension is not cosmetic. It is a signal that the binary was compiled and linked for a different operating system. The fix was to download the Linux build of Stockfish from the official GitHub releases and set the correct permissions.`,
    code: `# Wrong: this is a PE32+ binary
./engine/stockfish.exe  # EACCES or ENOENT

# Correct: download the Linux ELF binary
tar -xf stockfish-ubuntu-x86-64.tar.gz
mv stockfish-ubuntu-x86-64 engine/stockfish
chmod +x engine/stockfish`,
    note: `The chmod +x step is not optional. Linux does not infer executability from the file extension. The executable permission bit must be set explicitly or the OS will refuse to run the file even if it is a perfectly valid ELF binary.`
  },
  {
    id: "03",
    title: "Getting the binary onto the server",
    content: `Stockfish is approximately 110 megabytes. That is large enough to create real problems with standard deployment workflows.

The first attempt was a manual upload directly into the project repository. That worked locally but introduced a 110MB binary into version control, which is not sustainable.

The second attempt was Git LFS (Large File Storage). Git LFS replaces large files with text pointer files and stores the actual content on a separate server. In theory this is the right tool. In practice, the free tier limits and the push overhead made it unreliable for a file this size. The push stalled repeatedly.

The third approach was a runtime download. The binary was uploaded to Google Drive. At server startup, the application checks whether the binary exists. If it does not, it downloads the file from Drive, handles the redirect through Google's download confirmation page, and streams the bytes to disk. This approach has a startup cost — the first cold boot takes longer — but it keeps the repository clean and avoids LFS entirely.

The most reliable approach turned out to be downloading directly from the official GitHub releases endpoint during the build step. This is reproducible, fast, and does not depend on a third-party storage account.`,
    code: `async function downloadStockfish() {
  const exists = await fs.access("./engine/stockfish")
    .then(() => true)
    .catch(() => false);

  if (exists) return;

  const url =
    "https://github.com/official-stockfish/Stockfish/releases/download/sf_17/stockfish-ubuntu-x86-64.tar";
  const response = await axios({ url, responseType: "stream" });
  await pipeline(response.data, fs.createWriteStream("./engine/stockfish.tar"));

  await exec("tar -xf engine/stockfish.tar -C engine/");
  await exec("chmod +x engine/stockfish");
}`
  },
  {
    id: "04",
    title: "Node version: 0.0.1 away from peace",
    content: `While the backend was being debugged, the frontend build broke without any changes to the frontend code.

The installed Node version was v22.11.0. Vite 8 ships with Rolldown as its bundler, and Rolldown requires Node >= 22.12.0. The difference is 0.0.1 — a patch version. The build failure error message did not mention the version requirement clearly. It took time to trace the root cause.

This is a recurring problem with Vite specifically. The project upgrades its dependencies without broadcasting breaking changes in patch releases. A Vite upgrade that pulls in a new minor version of an internal dependency can silently change the minimum Node requirement. The project is not pinned to a specific Vite version by default, so a fresh install can get a newer version than what was tested.

The fix was upgrading to Node v24 LTS. The package.json engines field exists for exactly this reason — specifying the minimum Node version prevents future developers from hitting the same silent incompatibility. This happened while All Too Well (10 Minute Version) was playing. The timing was appropriate.`,
    code: `// In package.json — this field is worth setting
{
  "engines": {
    "node": ">=22.12.0"
  }
}

// The actual version gap that caused the failure:
// Installed:  Node v22.11.0
// Required:   Node v22.12.0  (Vite 8 + Rolldown)
// Solution:   Node v24 LTS`
  },
  {
    id: "05",
    title: "The engine pool incident",
    content: `The initial architecture included a pool of four Stockfish workers. The reasoning was straightforward: a pool means concurrent requests can be served without queuing. Four workers means four simultaneous analyses. This seemed like reasonable production thinking.

The pool was deployed to a shared work server.

Within seconds of the first request, the CPU usage spiked to near 100%. Memory consumption climbed sharply. The server became unresponsive. Four full Stockfish processes had started simultaneously on a machine that was already running other services. Each process is CPU-bound by design — Stockfish uses as many CPU cycles as it can get to search deeper into the position tree. Four of them competing for the same cores on a shared server is not a pool — it is a denial-of-service attack against your own infrastructure.

The recovery involved SSH access, manual process termination with kill -9, and deleting the deployment. The server took several minutes to stabilize. Other developers using the machine noticed.

The fix was reducing the pool to a single worker. One Stockfish process, managed carefully, with all requests queued through it. CPU usage became predictable. Memory usage stayed within bounds. The server did not crash again.`,
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
    warning:
      "Four Stockfish processes on a shared server will consume all available CPU. This is not a configuration problem — it is working as intended. Stockfish is designed to use every available cycle."
  },
  {
    id: "06",
    title: "Deployment: port binding and race conditions",
    content: `The Render deployment showed a healthy startup log. The service appeared to be running. Every request returned 502 Bad Gateway.

The cause was a hardcoded port number. Render assigns a port dynamically at runtime through the PORT environment variable. An application that binds to a fixed port — say, 3000 — is listening on the wrong port. The load balancer forwards requests to the port Render assigned, finds nothing listening there, and returns 502. The application is running correctly; it is just not reachable.

After fixing the port, a second class of startup errors appeared: spawn ENOENT when the engine was requested before it had finished downloading. The download function is asynchronous and takes time — the binary is over 100 megabytes. The original code started the engine pool and the HTTP server before the download resolved. Requests that arrived during the startup window tried to spawn a binary that did not exist yet.

The fix was sequencing: download the binary first, initialize the engine pool second, start the HTTP server last. The server only becomes reachable once the engine is ready.`,
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

start();`
  },
  {
    id: "07",
    title: "Trojans and security notes",
    content: `During development, three trojan alerts were triggered by the local antivirus software. All three were false positives. Stockfish is a large native binary that communicates via process spawning and stdin/stdout redirection — behavior that looks identical to what some malware does. Antivirus heuristics flag it.

This is worth noting for anyone integrating chess engines or other compiled binaries into web projects: expect security software to object. The binary should be verified against the official SHA-256 hash from the Stockfish releases page before deployment. Do not disable antivirus to make the warning go away — verify the binary instead.`,
    code: `# Verify the binary against the official hash
sha256sum stockfish-ubuntu-x86-64
# Compare against the hash published at
# https://github.com/official-stockfish/Stockfish/releases`
  },
  {
    id: "08",
    title: "Architecture and final state",
    content: `The final system is simpler than the initial design. One engine. One queue. Requests are processed sequentially rather than concurrently. The performance ceiling is lower but the system is stable and predictable.

This backend powers ChessSensei — a chess analysis application launching soon. The frontend lets users paste a PGN, select a move, and get Stockfish's evaluation of that position. The architecture described here is what runs underneath it.

Stockfish is genuinely expensive to run. Even a single instance will cause CPU usage to climb during analysis. On a small server, analysis requests should be rate-limited and the search depth should be capped — depth 15 is sufficient for most applications, and the CPU cost increases non-linearly as depth increases.

The Linux server issue is still not fully resolved. The next approach being considered is a different server architecture entirely — one that avoids the shared infrastructure problem rather than working around it. The details of that are a separate article.

The future optimization worth exploring is skipping the process entirely. C has direct access to CPU registers, and Stockfish's evaluation logic is ultimately arithmetic on board state. Rewriting the evaluation layer in C and calling it directly from Node via a native addon (N-API) would eliminate the inter-process communication overhead. This is speculative — the UCI protocol overhead is small compared to the search computation — but it is the direction further performance work would go.`,
    stack: {
      frontend: [
        "react-router-dom",
        "chess.js",
        "react-chessboard",
        "recharts",
        "lucide-react"
      ],
      backend: ["express", "child_process (Node stdlib)", "axios"]
    }
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Building ChessSensei: A Chess Analysis Backend with Stockfish and Node.js",
    excerpt:
      "ChessSensei is launching soon. This is the 26-hour engineering log behind it — binaries, OS mismatches, Node version gaps, a race condition on startup, and four Stockfish processes that nearly took down a shared server.",
    author: "Topinns",
    date: "March 17, 2026",
    category: "Engineering",
    readTime: "18 min",
    image:
      "https://res.cloudinary.com/dba1aezsn/image/upload/v1773772548/Screenshot_2026-03-17_180732_htm3vu.png",
    images: [
      "https://res.cloudinary.com/dba1aezsn/image/upload/v1773772548/Screenshot_2026-03-17_180732_htm3vu.png",
      "https://res.cloudinary.com/dba1aezsn/image/upload/v1773772482/Screenshot_2026-03-17_181112_b6x6xp.png",
      "https://res.cloudinary.com/dba1aezsn/image/upload/v1773772092/Screenshot_2026-03-17_181650_mmccha.png"
    ],
    type: "chess",
    chessSections,
    content: `ChessSensei is launching soon. This is the 26-hour engineering log behind it.`
  },
  {
    id: 2,
    title: "Fragments of Code, Fragments of Self",
    excerpt:
      "Sometimes I look at old projects and see not just logic, but echoes of who I was at that time—what I feared, what I hoped for, what I believed software could be. Code becomes a diary, even when I never meant it to...",
    author: "Topinns",
    date: "September 20, 2025",
    category: "Reflection",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
    content: `Opening an old repository feels like flipping through a forgotten journal. 
      Functions are written with a kind of urgency that belonged to a younger me, 
      one who believed elegance was the same thing as worth.  

      I can see in the indentation where I rushed, in the variable names where I dreamed. 
      A half-finished feature is not just technical debt, but a fossil of my distraction, 
      or perhaps my heartbreak that week.  

      Every developer, whether they admit it or not, leaves parts of themselves in the code. 
      Not just algorithms, but anxieties. Not just syntax, but longing.  

      And so, even when a project dies, fragments of me remain there—shadows I did not 
      intend to preserve. Maybe that's what makes revisiting old code both painful and 
      strangely tender. I'm not just debugging programs; I'm debugging myself.`
  },
  {
    id: 3,
    title: "The Silence Between Deploys",
    excerpt:
      "There's a stillness that lingers right after pushing new changes into the world. It feels like holding your breath, waiting to see if the universe accepts or rejects your offering. Failure humbles, success whispers relief...",
    author: "Topinns",
    date: "September 15, 2025",
    category: "Philosophy",
    readTime: "11 min",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
    content: `The moment after deployment is a peculiar kind of quiet.  
      You've typed \`git push\`, the logs have streamed by, and now you wait.  

      It's not really about the code anymore—it's about exposure. 
      Will the users see the update and feel nothing, or will they stumble 
      into a bug you missed?  

      In that pause, time stretches. My heartbeat sounds louder than the fan 
      of my machine. I am reminded that software is not a private act. 
      It is a conversation, whether I like it or not.  

      If things break, the silence ends with alerts, Slack messages, maybe even blame.  
      If things hold, the silence deepens into something else: a relief so gentle 
      it barely announces itself.  

      This is the rhythm of creation in code: the chaos of making, 
      the silence of waiting, the whisper of consequence.`
  },
  {
    id: 4,
    title: "When Systems Outlive Their Creators",
    excerpt:
      "I've walked through codebases older than my career, written by hands that may never return. There's a haunting beauty in systems that persist long after the minds that birthed them have moved on. Maintenance is memory work...",
    author: "Topinns",
    date: "September 10, 2025",
    category: "Technology",
    readTime: "14 min",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
    content: `Some systems feel like ruins—still standing, still functional, 
      but clearly belonging to another era.  
      Their patterns are archaic, their dependencies forgotten, 
      their documentation missing.  

      And yet, they work.  
      They carry the weight of countless transactions, decisions, lives.  

      When I step into these codebases, I feel like an archaeologist. 
      Every function call is an inscription. Every hack is a rumor.  
      I'll never know the full story of the people who built them, 
      but I can sense their presence.  

      Maintenance is not just about keeping systems alive. 
      It's about remembering that behind every enduring architecture 
      was once a mind trying to solve a problem.  

      To maintain is to honor. To rewrite is to mourn.`
  },
  {
    id: 5,
    title: "The Weight of Abandoned Repositories",
    excerpt:
      "Every forgotten GitHub repo feels like a tiny gravestone. They hold experiments that never bloomed, ideas that lost their urgency, versions of ourselves we quietly buried. Sometimes I scroll through them like a mourner...",
    author: "Topinns",
    date: "September 7, 2025",
    category: "Craft",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
    content: `I have dozens of repositories that will never see another commit.  
      Some were prototypes, some were wild ideas, some were fragile bursts of hope.  

      They sit in my GitHub like little tombstones, each one a project 
      that carried me for a season and then let me go.  

      Sometimes I wonder: are these failures? Or are they simply traces 
      of growth—projects that taught me something before they became unnecessary?  

      Abandoned code is heavy because it mirrors the parts of ourselves 
      we've also abandoned. The dreams we had, the energy we've lost, 
      the illusions we've shed.  

      But maybe that's what craft really is: not every seed growing into a tree, 
      but every attempt leaving behind something that shaped us, even in silence.`
  },
  {
    id: 6,
    title: "Some Nights, the Code Doesn't Save Me",
    excerpt:
      "This is one of those vanity-card entries. No clever abstractions, no grand conclusions. Just the quiet admission that some nights, even in front of glowing screens, the loneliness is louder than the syntax...",
    author: "Topinns",
    date: "September 3, 2025",
    category: "Vanity",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
    content: `Most nights, I lose myself in code. The logic consumes me, 
      the puzzle distracts me, and the loneliness fades.  

      But not always.  

      Some nights the keystrokes sound hollow. The monitor feels cold. 
      The compiler cannot fix what is broken inside me.  

      I remind myself that being human is not a bug.  
      That emptiness, too, is part of the design.  

      And on those nights, I close the laptop not as a developer, 
      but as a person—one who needs silence, rest, 
      maybe even someone else's presence more than another line of code.`
  },
  {
    id: 7,
    title: "Patterns in the Chaos of Frameworks",
    excerpt:
      "New tools rise every month, promising salvation, efficiency, elegance. Most will fade, but hidden beneath the churn are patterns—enduring truths about how humans attempt to tame complexity. The noise conceals a quiet order...",
    author: "Topinns",
    date: "August 29, 2025",
    category: "Technology",
    readTime: "13 min",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
    content: `The tech landscape is a storm of frameworks.  
      React gives way to Svelte, which gives way to the next thing.  
      Each promises to be the future, each gathers disciples, 
      and each eventually fades into the archive.  

      At first it feels exhausting—how can we ever keep up?  
      But beneath the churn, there are patterns.  
      Frameworks rise and fall, but the problems remain the same: 
      state, rendering, data flow, human comprehension.  

      What changes is the syntax, the packaging, the story we tell ourselves 
      about control.  

      The truth is, frameworks are less about technology 
      and more about our relationship with complexity.  
      They are mirrors of our desires: for order, for clarity, 
      for the illusion that we can outpace chaos.  

      The frameworks will keep coming. The patterns will remain.`
  },
  {
    id: 8,
    title: "What Truly Is Love?",
    excerpt:
      "Is love letting go, or is it fighting? Does it finish, or does it echo through eternity? For years I have wrestled with these questions, trying to find meaning in the paradox of human affection...",
    author: "Topinns",
    date: "September 25, 2025",
    category: "Philosophy",
    readTime: "14 min",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    type: "standard",
    content: `What truly is love?  
    Is love letting go, or is it fighting?  
    Is it sometimes fighting and other times letting go?  
    Is it about understanding that someone deserves better, and then "ghosting" them?  
    Or is it about the time spent together, or the promise of "till death do us part"?  

    Is love about being there for someone no matter what, or is it about knowing this person is wrong, and still standing by them?  
    Is it about knowing someone is wrong, and because you can't stand the decision, you leave?  
    Does love ever truly "finish," or does it continue for eternity?  
    Can love pretend for a very, very long time?  
    Do I even understand what love really is?  

    For the last seven years of my life, I have struggled with this thought process.  
    In the end, how do you really know something is love?  
    Not by the time, not the "feelings," not even how much of friends we are.  
    Is it by how much you cry when the person leaves?  

    To be honest, I don't think I will ever fully understand the feeling.  
    I am just a man, and I am not even very good at being a man yet.  
    I believe understanding quantum mechanics is easier than understanding the concept of human love.  

    In the end, love is many things.  
    Love is what carries people to fight wars.  
    Love is what makes people poison others.  
    Love is what makes people deceive each other.  
    Love is sometimes translated as hatred.  

    Freud saw love through a different lens — he coined the word ambivalence,  
    trying to explain how we all have both love and hate towards the same person.  
    So, in the end, hate (I am paraphrasing) is just the absence of love.  
    In some sense, every single human emotion stems from the presence or absence of love.  

    I don't want to go into Friedrich (I think everyone knows how much I like him) — the "diagnostician of nihilism."  
    Though he never defined both as the same thing, in some contexts his writings (at least the ones I have read) point in that perspective.  

    I have been very terrible at expressing love, but in a subtle way I think writing has been the way I've enjoyed expressing it — writing, and also occasionally other things.  
    I think love is about giving, giving in some form or another:  
    giving your time, your emotions, your money, no matter how little it might be.  

    And today, I am expressing my love in a letter.  
    So, this — this is to someone.  
    Or is it?`
  }
];
