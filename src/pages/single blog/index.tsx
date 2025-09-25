// BlogPostPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, User, Calendar, Tag } from "lucide-react";
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
      text: "This really resonated with me.",
      date: "Sep 25, 2025"
    },
    {
      id: 2,
      author: "Markus",
      text: "Well written and very thoughtful!",
      date: "Sep 25, 2025"
    }
  ]);
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isLightMode
          ? "bg-amber-50"
          : "bg-slate-900 text-gray-100"}`}
      >
        <p className="font-serif text-lg">Post not found.</p>
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
      author: "Guest",
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

  return (
    <div
      className={`min-h-screen transition-colors mt-6 lg:mt-14 duration-300 ${isLightMode
        ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
        : "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"}`}
    >
      <div
        className={`max-w-3xl mx-auto px-6 py-10 transition-colors duration-300 ${isLightMode
          ? "text-gray-800"
          : "text-gray-100"}`}
      >
        {/* Header */}
        <header
          className={`mb-6 rounded-lg px-4 py-6 transition-colors duration-300 ${isLightMode
            ? "bg-white/70 border border-amber-100"
            : "bg-slate-900/70 border border-slate-700"}`}
        >
          <h1
            className={`text-4xl font-serif font-bold ${isLightMode
              ? "text-gray-800"
              : "text-gray-100"}`}
          >
            {post.title}
          </h1>
          <p
            className={`mt-2 font-serif ${isLightMode
              ? "text-gray-600"
              : "text-gray-400"}`}
          >
            {post.excerpt}
          </p>
        </header>

        {/* Meta */}
        <div
          className={`flex items-center space-x-4 text-sm mb-6 ${isLightMode
            ? "text-gray-600"
            : "text-gray-400"}`}
        >
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span className="font-serif">
              By {post.author}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span className="font-serif">
              {post.date}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Tag className="w-4 h-4" />
            <span className="font-serif">
              {post.category}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div
          className={`w-full h-72 rounded-2xl overflow-hidden shadow mb-8 transition-opacity duration-300 ${isLightMode
            ? "bg-white"
            : "bg-slate-800"}`}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none mb-10">
          {post.content.trim().split("\n").map((para, idx) =>
            <p
              key={idx}
              className={`${isLightMode
                ? "text-gray-700"
                : "text-gray-300"} font-serif`}
            >
              {para.trim()}
            </p>
          )}
        </article>

        {/* Actions */}
        <div className="flex items-center space-x-6 mb-8">
          <button
            onClick={toggleLike}
            aria-pressed={liked}
            className={`flex items-center space-x-2 font-serif transition-colors duration-150 ${isLightMode
              ? "text-gray-700 hover:text-pink-600"
              : "text-gray-300 hover:text-pink-400"}`}
          >
            <Heart
              className={`w-5 h-5 ${liked
                ? "fill-pink-500 text-pink-500"
                : isLightMode ? "text-rose-600" : "text-rose-400"}`}
            />
            <span>
              {likes}
            </span>
          </button>

          <div
            className={`flex items-center space-x-2 font-serif ${isLightMode
              ? "text-gray-700"
              : "text-gray-300"}`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>
              {comments.length}
            </span>
          </div>
        </div>

        {/* Comments */}
        <section className="space-y-6">
          <h2
            className={`text-2xl font-semibold ${isLightMode
              ? "text-gray-800"
              : "text-gray-100"}`}
          >
            Comments
          </h2>

          {/* Add comment */}
          <div className="flex flex-col space-y-2">
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className={`w-full border rounded-lg p-3 resize-none min-h-[90px] font-serif transition-colors duration-150 ${isLightMode
                ? "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                : "bg-slate-800 border-slate-600 text-gray-200 placeholder-slate-400"}`}
            />
            <button
              onClick={addComment}
              className={`self-end px-4 py-2 rounded-md font-serif transition-colors duration-150 ${isLightMode
                ? "bg-amber-200 text-amber-900 hover:bg-amber-300"
                : "bg-amber-900 text-amber-100 hover:bg-amber-800"}`}
            >
              Post
            </button>
          </div>

          {/* Comment list */}
          <div className="space-y-4">
            {comments.map(c =>
              <div
                key={c.id}
                className={`p-4 rounded-lg shadow-sm transition-colors duration-150 ${isLightMode
                  ? "bg-white border border-gray-100 text-gray-800"
                  : "bg-slate-800 border border-slate-700 text-gray-200"}`}
              >
                <p className="font-serif">
                  {c.text}
                </p>
                <div
                  className={`text-xs mt-2 ${isLightMode
                    ? "text-gray-500"
                    : "text-gray-400"}`}
                >
                  {c.author} • {c.date}
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
