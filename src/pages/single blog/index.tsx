// BlogPostPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  User,
  Calendar,
  Tag,
  ArrowLeft
} from "lucide-react";
import { blogPosts } from "../../utils/blogs";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface BlogPostPageProps {
  isLightMode?: boolean;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ isLightMode = true }) => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === Number(id));

  const [likes, setLikes] = useState(42);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Jane Doe",
      text:
        "This really resonated with me. The insights about personal growth and self-reflection are particularly valuable.",
      date: "Sep 25, 2025"
    },
    {
      id: 2,
      author: "Marcus Chen",
      text:
        "Well written and very thoughtful! I appreciate the depth of analysis here.",
      date: "Sep 24, 2025"
    },
    {
      id: 3,
      author: "Sarah Williams",
      text:
        "Thanks for sharing this perspective. It's given me a lot to think about.",
      date: "Sep 23, 2025"
    }
  ]);
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isLightMode
          ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
          : "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"}`}
      >
        <div className="text-center space-y-4">
          <p
            className={`font-serif text-2xl ${isLightMode
              ? "text-gray-800"
              : "text-gray-100"}`}
          >
            Post not found
          </p>
          <button
            onClick={() => window.history.back()}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-serif transition-all duration-200 ${isLightMode
              ? "bg-amber-200 text-amber-900 hover:bg-amber-300 hover:shadow-lg"
              : "bg-amber-900 text-amber-100 hover:bg-amber-800 hover:shadow-lg"}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  const toggleLike = () => {
    setLiked(prev => !prev);
    setLikes(prev => prev + (liked ? -1 : 1));
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const newEntry: Comment = {
      id: comments.length + 1,
      author: "Guest User",
      text: newComment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };
    setComments(prev => [newEntry, ...prev]);
    setNewComment("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      addComment();
    }
  };

  return (
    <div
      className={`min-h-screen transition-all mt-10 md:mt-16 duration-500 ${isLightMode
        ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
        : "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"}`}
    >
      {/* Back button */}
      <div className="sticky top-6 z-10 px-6 pt-6">
        <button
          onClick={() => window.history.back()}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-200 hover:scale-105 ${isLightMode
            ? "bg-white/80 border-amber-200 text-amber-900 hover:bg-white/90 hover:shadow-lg"
            : "bg-slate-800/80 border-slate-600 text-amber-100 hover:bg-slate-800/90 hover:shadow-lg"}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-serif text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <div className="space-y-6">
            <h1
              className={`text-5xl md:text-6xl font-serif font-bold leading-tight ${isLightMode
                ? "text-gray-900"
                : "text-gray-100"}`}
            >
              {post.title}
            </h1>

            <p
              className={`text-xl md:text-2xl font-serif leading-relaxed max-w-3xl mx-auto ${isLightMode
                ? "text-gray-600"
                : "text-gray-400"}`}
            >
              {post.excerpt}
            </p>

            {/* Meta information */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
              <div
                className={`flex items-center space-x-2 ${isLightMode
                  ? "text-gray-700"
                  : "text-gray-300"}`}
              >
                <User className="w-5 h-5" />
                <span className="font-serif text-lg">
                  {post.author}
                </span>
              </div>

              <div
                className={`w-1.5 h-1.5 rounded-full ${isLightMode
                  ? "bg-gray-400"
                  : "bg-gray-500"}`}
              />

              <div
                className={`flex items-center space-x-2 ${isLightMode
                  ? "text-gray-700"
                  : "text-gray-300"}`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-serif text-lg">
                  {post.date}
                </span>
              </div>

              <div
                className={`w-1.5 h-1.5 rounded-full ${isLightMode
                  ? "bg-gray-400"
                  : "bg-gray-500"}`}
              />

              <div
                className={`flex items-center space-x-2 ${isLightMode
                  ? "text-gray-700"
                  : "text-gray-300"}`}
              >
                <Tag className="w-5 h-5" />
                <span className="font-serif text-lg">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-16">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none`}
          />
        </div>

        {/* Content */}
        <article className="mb-16">
          <div className="prose prose-xl max-w-none">
            {post.content.trim().split("\n").map((para, idx) =>
              <p
                key={idx}
                className={`mb-6 leading-relaxed font-serif text-lg ${isLightMode
                  ? "text-gray-800"
                  : "text-gray-200"}`}
              >
                {para.trim()}
              </p>
            )}
          </div>
        </article>

        {/* Divider */}
        <div
          className={`w-32 h-px mx-auto mb-12 ${isLightMode
            ? "bg-gray-300"
            : "bg-gray-600"}`}
        />

        {/* Actions */}
        <div className="flex items-center justify-center space-x-8 mb-16">
          <button
            onClick={toggleLike}
            aria-pressed={liked}
            className={`group flex items-center space-x-3 px-6 py-3 rounded-full font-serif text-lg transition-all duration-200 hover:scale-105 ${isLightMode
              ? "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
              : "text-gray-300 hover:text-pink-400 hover:bg-pink-950/30"}`}
          >
            <Heart
              className={`w-6 h-6 transition-all duration-200 ${liked
                ? "fill-pink-500 text-pink-500 scale-110"
                : `group-hover:scale-110 ${isLightMode
                    ? "text-rose-600"
                    : "text-rose-400"}`}`}
            />
            <span className="font-semibold">
              {likes}
            </span>
          </button>

          <div
            className={`flex items-center space-x-3 px-6 py-3 font-serif text-lg ${isLightMode
              ? "text-gray-700"
              : "text-gray-300"}`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">
              {comments.length}
            </span>
          </div>
        </div>

        {/* Comments Section */}
        <section className="space-y-8">
          <h2
            className={`text-3xl font-serif font-bold text-center ${isLightMode
              ? "text-gray-900"
              : "text-gray-100"}`}
          >
            Comments
          </h2>

          {/* Add comment */}
          <div
            className={`p-6 rounded-2xl border backdrop-blur-sm ${isLightMode
              ? "bg-white/70 border-amber-200"
              : "bg-slate-800/70 border-slate-600"}`}
          >
            <div className="space-y-4">
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Share your thoughts... (Cmd/Ctrl + Enter to post)"
                className={`w-full border-0 rounded-xl p-4 resize-none min-h-[120px] font-serif text-lg leading-relaxed focus:ring-2 transition-all duration-200 ${isLightMode
                  ? "bg-white text-gray-800 placeholder-gray-500 focus:ring-amber-300"
                  : "bg-slate-800 text-gray-200 placeholder-slate-400 focus:ring-amber-600"}`}
              />
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-serif ${isLightMode
                    ? "text-gray-500"
                    : "text-gray-400"}`}
                >
                  {newComment.length} characters
                </span>
                <button
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  className={`px-8 py-3 rounded-xl font-serif text-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${isLightMode
                    ? "bg-amber-300 text-amber-900 hover:bg-amber-400 hover:shadow-lg"
                    : "bg-amber-800 text-amber-100 hover:bg-amber-700 hover:shadow-lg"}`}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comment list */}
          <div className="space-y-6">
            {comments.map(c =>
              <div
                key={c.id}
                className={`group p-6 rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${isLightMode
                  ? "bg-white/70 border-gray-200 hover:bg-white/80"
                  : "bg-slate-800/70 border-slate-600 hover:bg-slate-800/80"}`}
              >
                <div className="space-y-3">
                  <p
                    className={`font-serif text-lg leading-relaxed ${isLightMode
                      ? "text-gray-800"
                      : "text-gray-200"}`}
                  >
                    {c.text}
                  </p>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-semibold text-sm ${isLightMode
                        ? "bg-amber-200 text-amber-900"
                        : "bg-amber-900 text-amber-100"}`}
                    >
                      {c.author.charAt(0).toUpperCase()}
                    </div>
                    <div
                      className={`text-sm font-serif ${isLightMode
                        ? "text-gray-600"
                        : "text-gray-400"}`}
                    >
                      <span className="font-medium">
                        {c.author}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {c.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPostPage;
