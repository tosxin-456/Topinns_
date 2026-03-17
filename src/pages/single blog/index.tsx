// BlogPostPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  Calendar,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { blogPosts, type ChessSection } from "../../utils/blogs";

// interface Comment {
//   id: number;
//   author: string;
//   text: string;
//   date: string;
// }

interface BlogPostPageProps {
  isLightMode?: boolean;
}

// ─── Chess-specific sub-components ───────────────────────────────────────────

function UCIExchange({
  send,
  receive,
}: {
  send: string[];
  receive: string[];
}) {
  return (
    <div className="mt-4 mb-2">
      <p className="font-mono text-xs tracking-widest uppercase mb-2 opacity-40">
        UCI exchange
      </p>
      <div className="rounded-xl overflow-hidden border border-slate-700/60 text-sm font-mono">
        <div className="border-b border-slate-700/60">
          {send.map((line, i) => (
            <div key={i} className="px-4 py-2 text-blue-300 leading-relaxed">
              <span className="text-slate-600 mr-3 select-none">→</span>
              {line}
            </div>
          ))}
        </div>
        <div>
          {receive.map((line, i) => (
            <div key={i} className="px-4 py-2 text-emerald-400 leading-relaxed">
              <span className="text-slate-600 mr-3 select-none">←</span>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChessCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative mt-4 mb-2">
      <button
        onClick={copy}
        className="absolute top-3 right-3 z-10 font-mono text-[10px] tracking-widest px-2 py-1 rounded border border-slate-700 bg-slate-800 transition-colors"
        style={{ color: copied ? "#4ade80" : "#6b7280" }}
      >
        {copied ? "COPIED" : "COPY"}
      </button>
      <pre className="rounded-xl p-4 text-sm leading-relaxed overflow-x-auto bg-slate-900 border border-slate-700/60 text-slate-300 font-mono whitespace-pre">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

function ChessImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mb-16">
      {/* Main image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-3">
        <img
          key={active}
          src={images[active]}
          alt={`ChessSensei screenshot ${active + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ filter: "brightness(0.92)" }}
        />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
        {/* Counter badge */}
        <div className="absolute bottom-4 right-4 font-mono text-xs px-2 py-1 rounded"
          style={{ background: "rgba(0,0,0,0.55)", color: "#9ca3af", backdropFilter: "blur(4px)" }}>
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="flex-1 aspect-video rounded-xl overflow-hidden transition-all duration-200"
            style={{
              outline: i === active ? "2px solid #6366f1" : "2px solid transparent",
              outlineOffset: "2px",
              opacity: i === active ? 1 : 0.55,
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLButtonElement).style.opacity = "0.55"; }}
          >
            <img
              src={src}
              alt={`ChessSensei screenshot ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Caption */}
      <p className="text-center font-mono text-xs mt-3" style={{ color: "#6b7280" }}>
        ChessSensei — launching soon
      </p>
    </div>
  );
}

function ChessArticleBody({
  sections,
  isLightMode,
}: {
  sections: ChessSection[];
  isLightMode: boolean;
}) {
  // Status tags
  const tags = [
    { label: "Binary format mismatch", color: "#ef4444" },
    { label: "Engine pool incident", color: "#ef4444" },
    { label: "Node 0.0.1 gap", color: "#f59e0b" },
    { label: "Race condition on startup", color: "#f59e0b" },
    { label: "Resolved", color: "#4ade80" },
  ];

  return (
    <div className="font-sans">
      {/* Status tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map(({ label, color }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 border rounded px-3 py-1 font-mono text-xs tracking-wide"
            style={{
              background: isLightMode ? "#f8f8f8" : "#0f0f0f",
              borderColor: isLightMode ? "#e5e7eb" : "#1a1a1a",
              color: isLightMode ? "#6b7280" : "#6b7280",
            }}
          >
            <span
              className="rounded-full inline-block flex-shrink-0"
              style={{ width: 7, height: 7, background: color }}
            />
            {label}
          </span>
        ))}
      </div>

      {/* Architecture strip */}
      <div
        className="mb-8 p-5 rounded-2xl border"
        style={{
          background: isLightMode ? "#f9f9f9" : "#080808",
          borderColor: isLightMode ? "#e5e7eb" : "#111",
        }}
      >
        <p
          className="font-mono text-xs tracking-widest uppercase mb-4"
          style={{ color: isLightMode ? "#9ca3af" : "#374151" }}
        >
          Final architecture
        </p>
        <div className="flex flex-wrap items-center gap-0">
          {[
            "React client",
            "Express API",
            "Request queue",
            "StockfishWorker",
            "Stockfish (ELF binary)",
          ].map((node, i, arr) => (
            <div key={node} className="flex items-center">
              <div
                className="px-3 py-2 rounded font-mono text-xs whitespace-nowrap"
                style={{
                  background:
                    i === 4
                      ? "#0f1a0f"
                      : i === 3
                      ? "#0f0f1a"
                      : isLightMode
                      ? "#f0f0f0"
                      : "#0f0f0f",
                  border: `1px solid ${
                    i === 4
                      ? "#1a2e1a"
                      : i === 3
                      ? "#1a1a2e"
                      : isLightMode
                      ? "#e5e7eb"
                      : "#1a1a1a"
                  }`,
                  color:
                    i === 4
                      ? "#4ade80"
                      : i === 3
                      ? "#818cf8"
                      : isLightMode
                      ? "#6b7280"
                      : "#9ca3af",
                }}
              >
                {node}
              </div>
              {i < arr.length - 1 && (
                <span
                  className="px-1 font-mono text-xs"
                  style={{ color: isLightMode ? "#d1d5db" : "#374151" }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="font-mono text-xs mt-3"
          style={{ color: isLightMode ? "#d1d5db" : "#374151" }}
        >
          Single engine — sequential queue — no concurrent processes
        </p>
      </div>

      {/* Section index */}
      <nav className="mb-8 pb-6 border-b" style={{ borderColor: isLightMode ? "#f0f0f0" : "#0f0f0f" }}>
        <p
          className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{ color: isLightMode ? "#9ca3af" : "#374151" }}
        >
          Index
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() =>
                document
                  .getElementById(`chess-section-${s.id}`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-baseline gap-3 py-1 text-left font-mono text-xs transition-colors"
              style={{ color: isLightMode ? "#9ca3af" : "#4b5563" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = isLightMode ? "#374151" : "#d1d5db")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isLightMode ? "#9ca3af" : "#4b5563")
              }
            >
              <span style={{ color: "#6366f1", flexShrink: 0 }}>{s.id}</span>
              <span className="leading-snug">{s.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Sections */}
      {sections.map((section, idx) => (
        <div
          key={section.id}
          id={`chess-section-${section.id}`}
          className="py-8"
          style={{
            borderBottom:
              idx < sections.length - 1
                ? `1px solid ${isLightMode ? "#f0f0f0" : "#0f0f0f"}`
                : "none",
          }}
        >
          <div className="flex items-start gap-5 mb-4">
            <span
              className="font-mono text-xs tracking-wider flex-shrink-0 mt-1"
              style={{ color: "#6366f1" }}
            >
              {section.id}
            </span>
            <h3
              className="text-xl font-semibold leading-snug"
              style={{
                color: isLightMode ? "#111827" : "#f9fafb",
                letterSpacing: "-0.01em",
              }}
            >
              {section.title}
            </h3>
          </div>

          <div className="pl-9">
            {section.content.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-base leading-relaxed mb-4 font-serif"
                style={{ color: isLightMode ? "#4b5563" : "#9ca3af" }}
              >
                {para.trim()}
              </p>
            ))}

            {section.uci && (
              <UCIExchange
                send={section.uci.send}
                receive={section.uci.receive}
              />
            )}

            {section.note && (
              <div
                className="my-4 px-4 py-3 text-sm leading-relaxed rounded-r-xl"
                style={{
                  background: isLightMode ? "#f0fdf4" : "#0a0f0a",
                  borderLeft: "2px solid #15803d",
                  color: isLightMode ? "#374151" : "#6b7280",
                }}
              >
                {section.note}
              </div>
            )}

            {section.warning && (
              <div
                className="my-4 px-4 py-3 text-sm leading-relaxed rounded-r-xl"
                style={{
                  background: isLightMode ? "#fef2f2" : "#110a0a",
                  borderLeft: "2px solid #b91c1c",
                  color: isLightMode ? "#374151" : "#6b7280",
                }}
              >
                <span
                  className="font-mono text-[10px] tracking-widest uppercase block mb-1"
                  style={{ color: "#ef4444" }}
                >
                  Warning
                </span>
                {section.warning}
              </div>
            )}

            {section.code && <ChessCodeBlock code={section.code} />}

            {section.stack && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {Object.entries(section.stack).map(([cat, items]) => (
                  <div
                    key={cat}
                    className="rounded-xl p-4 border"
                    style={{
                      background: isLightMode ? "#f9f9f9" : "#080808",
                      borderColor: isLightMode ? "#e5e7eb" : "#111",
                    }}
                  >
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase mb-3"
                      style={{ color: isLightMode ? "#9ca3af" : "#374151" }}
                    >
                      {cat}
                    </p>
                    {(items as string[]).map((pkg) => (
                      <div
                        key={pkg}
                        className="flex items-center gap-2 py-0.5 font-mono text-xs"
                        style={{ color: isLightMode ? "#6b7280" : "#6b7280" }}
                      >
                        <span style={{ color: isLightMode ? "#d1d5db" : "#1f2937" }}>
                          —
                        </span>
                        {pkg}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Chess article footer */}
      <div
        className="mt-8 pt-8 flex flex-wrap justify-between gap-6 border-t"
        style={{ borderColor: isLightMode ? "#f0f0f0" : "#0f0f0f" }}
      >
        <div>
          <p
            className="font-mono text-[10px] tracking-widest uppercase mb-2"
            style={{ color: isLightMode ? "#9ca3af" : "#374151" }}
          >
            Duration
          </p>
          <p
            className="font-mono text-3xl font-semibold"
            style={{ color: isLightMode ? "#111827" : "#f9fafb" }}
          >
            26:00:00
          </p>
          <p
            className="font-mono text-xs mt-1"
            style={{ color: isLightMode ? "#9ca3af" : "#374151" }}
          >
            Soundtrack: All Too Well (10 Min Version) — Taylor Swift
          </p>
        </div>
        <div>
          <p
            className="font-mono text-[10px] tracking-widest uppercase mb-2"
            style={{ color: isLightMode ? "#9ca3af" : "#374151" }}
          >
            Open issues
          </p>
          {[
            "Rate limiting for analysis requests",
            "Queue depth monitoring",
            "C/N-API evaluation path (speculative)",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 py-0.5 font-mono text-xs"
              style={{ color: isLightMode ? "#9ca3af" : "#4b5563" }}
            >
              <span style={{ color: isLightMode ? "#d1d5db" : "#1f2937" }}>○</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────

const BlogPostPage: React.FC<BlogPostPageProps> = ({ isLightMode = true }) => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === Number(id));

  // const [likes, setLikes] = useState(42);
  // const [liked, setLiked] = useState(false);
  // const [comments, setComments] = useState<Comment[]>([
  //   {
  //     id: 1,
  //     author: "Jane Doe",
  //     text: "This really resonated with me. The insights about personal growth and self-reflection are particularly valuable.",
  //     date: "Sep 25, 2025",
  //   },
  //   {
  //     id: 2,
  //     author: "Marcus Chen",
  //     text: "Well written and very thoughtful! I appreciate the depth of analysis here.",
  //     date: "Sep 24, 2025",
  //   },
  //   {
  //     id: 3,
  //     author: "Sarah Williams",
  //     text: "Thanks for sharing this perspective. It's given me a lot to think about.",
  //     date: "Sep 23, 2025",
  //   },
  // ]);
  // const [newComment, setNewComment] = useState("");

  if (!post) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isLightMode
            ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
            : "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
        }`}
      >
        <div className="text-center space-y-4">
          <p
            className={`font-serif text-2xl ${
              isLightMode ? "text-gray-800" : "text-gray-100"
            }`}
          >
            Post not found
          </p>
          <button
            onClick={() => window.history.back()}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-serif transition-all duration-200 ${
              isLightMode
                ? "bg-amber-200 text-amber-900 hover:bg-amber-300 hover:shadow-lg"
                : "bg-amber-900 text-amber-100 hover:bg-amber-800 hover:shadow-lg"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  // const toggleLike = () => {
  //   setLiked((prev) => !prev);
  //   setLikes((prev) => prev + (liked ? -1 : 1));
  // };

  // const addComment = () => {
  //   if (!newComment.trim()) return;
  //   const newEntry: Comment = {
  //     id: comments.length + 1,
  //     author: "Guest User",
  //     text: newComment.trim(),
  //     date: new Date().toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //       year: "numeric",
  //     }),
  //   };
  //   setComments((prev) => [newEntry, ...prev]);
  //   setNewComment("");
  // };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
  //     addComment();
  //   }
  // };

  const isChess = post.type === "chess";

  return (
    <div
      className={`min-h-screen transition-all mt-10 md:mt-16 duration-500 ${
        isLightMode
          ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
          : "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
      }`}
    >
      {/* Back button */}
      <div className="sticky top-6 z-10 px-6 pt-6">
        <button
          onClick={() => window.history.back()}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-200 hover:scale-105 ${
            isLightMode
              ? "bg-white/80 border-amber-200 text-amber-900 hover:bg-white/90 hover:shadow-lg"
              : "bg-slate-800/80 border-slate-600 text-amber-100 hover:bg-slate-800/90 hover:shadow-lg"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-serif text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <div className="space-y-6">
            {/* Engineering badge for chess post */}
            {isChess && (
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-3 py-1 rounded border"
                  style={{
                    background: isLightMode ? "#f0f0ff" : "#0f0f1a",
                    borderColor: isLightMode ? "#c7d2fe" : "#1a1a2e",
                    color: "#6366f1",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                  Engineering Log · 26 hours
                </span>
              </div>
            )}

            <h1
              className={`text-5xl md:text-6xl font-serif font-bold leading-tight ${
                isLightMode ? "text-gray-900" : "text-gray-100"
              }`}
            >
              {post.title}
            </h1>

            <p
              className={`text-xl md:text-2xl font-serif leading-relaxed max-w-3xl mx-auto ${
                isLightMode ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
              <div
                className={`flex items-center space-x-2 ${
                  isLightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-serif text-lg">{post.author}</span>
              </div>
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isLightMode ? "bg-gray-400" : "bg-gray-500"
                }`}
              />
              <div
                className={`flex items-center space-x-2 ${
                  isLightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-serif text-lg">{post.date}</span>
              </div>
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isLightMode ? "bg-gray-400" : "bg-gray-500"
                }`}
              />
              <div
                className={`flex items-center space-x-2 ${
                  isLightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <Tag className="w-5 h-5" />
                <span className="font-serif text-lg">{post.category}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured image / gallery */}
        {isChess && post.images && post.images.length > 0 ? (
          <ChessImageGallery images={post.images} />
        ) : post.image ? (
          <div className="relative mb-16">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ) : null}

        {/* Content */}
        <article className="mb-16">
          {isChess && post.chessSections ? (
            <ChessArticleBody
              sections={post.chessSections}
              isLightMode={isLightMode}
            />
          ) : (
            <div className="prose prose-xl max-w-none">
              {post.content
                .trim()
                .split("\n")
                .map((para, idx) => (
                  <p
                    key={idx}
                    className={`mb-6 leading-relaxed font-serif text-lg ${
                      isLightMode ? "text-gray-800" : "text-gray-200"
                    }`}
                  >
                    {para.trim()}
                  </p>
                ))}
            </div>
          )}
        </article>

        {/* Divider */}
        <div
          className={`w-32 h-px mx-auto mb-12 ${
            isLightMode ? "bg-gray-300" : "bg-gray-600"
          }`}
        />

        {/* Actions */}
        {/* <div className="flex items-center justify-center space-x-8 mb-16">
          <button
            onClick={toggleLike}
            aria-pressed={liked}
            className={`group flex items-center space-x-3 px-6 py-3 rounded-full font-serif text-lg transition-all duration-200 hover:scale-105 ${
              isLightMode
                ? "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                : "text-gray-300 hover:text-pink-400 hover:bg-pink-950/30"
            }`}
          >
            <Heart
              className={`w-6 h-6 transition-all duration-200 ${
                liked
                  ? "fill-pink-500 text-pink-500 scale-110"
                  : `group-hover:scale-110 ${
                      isLightMode ? "text-rose-600" : "text-rose-400"
                    }`
              }`}
            />
            <span className="font-semibold">{likes}</span>
          </button>

          <div
            className={`flex items-center space-x-3 px-6 py-3 font-serif text-lg ${
              isLightMode ? "text-gray-700" : "text-gray-300"
            }`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">{comments.length}</span>
          </div>
        </div> */}

        {/* Comments */}
        <section className="space-y-8">
          {/* <h2
            className={`text-3xl font-serif font-bold text-center ${
              isLightMode ? "text-gray-900" : "text-gray-100"
            }`}
          >
            Comments
          </h2> */}

          {/* Add comment */}
          {/* <div
            className={`p-6 rounded-2xl border backdrop-blur-sm ${
              isLightMode
                ? "bg-white/70 border-amber-200"
                : "bg-slate-800/70 border-slate-600"
            }`}
          >
            <div className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Share your thoughts... (Cmd/Ctrl + Enter to post)"
                className={`w-full border-0 rounded-xl p-4 resize-none min-h-[120px] font-serif text-lg leading-relaxed focus:ring-2 transition-all duration-200 ${
                  isLightMode
                    ? "bg-white text-gray-800 placeholder-gray-500 focus:ring-amber-300"
                    : "bg-slate-800 text-gray-200 placeholder-slate-400 focus:ring-amber-600"
                }`}
              />
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-serif ${
                    isLightMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {newComment.length} characters
                </span>
                <button
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  className={`px-8 py-3 rounded-xl font-serif text-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isLightMode
                      ? "bg-amber-300 text-amber-900 hover:bg-amber-400 hover:shadow-lg"
                      : "bg-amber-800 text-amber-100 hover:bg-amber-700 hover:shadow-lg"
                  }`}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div> */}

          {/* Comment list */}
          {/* <div className="space-y-6">
            {comments.map((c) => (
              <div
                key={c.id}
                className={`group p-6 rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  isLightMode
                    ? "bg-white/70 border-gray-200 hover:bg-white/80"
                    : "bg-slate-800/70 border-slate-600 hover:bg-slate-800/80"
                }`}
              >
                <div className="space-y-3">
                  <p
                    className={`font-serif text-lg leading-relaxed ${
                      isLightMode ? "text-gray-800" : "text-gray-200"
                    }`}
                  >
                    {c.text}
                  </p>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-semibold text-sm ${
                        isLightMode
                          ? "bg-amber-200 text-amber-900"
                          : "bg-amber-900 text-amber-100"
                      }`}
                    >
                      {c.author.charAt(0).toUpperCase()}
                    </div>
                    <div
                      className={`text-sm font-serif ${
                        isLightMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      <span className="font-medium">{c.author}</span>
                      <span className="mx-2">•</span>
                      <span>{c.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default BlogPostPage;