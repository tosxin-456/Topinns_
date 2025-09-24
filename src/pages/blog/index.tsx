import React, { useState } from "react";
import {
  BookOpen,
  Feather,
  Calendar,
  User,
  Tag,
  ChevronRight
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

interface BlogPageProps {
  isLightMode?: boolean;
}

const BlogPage: React.FC<BlogPageProps> = ({ isLightMode = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "On the Nature of Code and Craftsmanship",
      excerpt:
        "In the quiet hours of dawn, when the world sleeps and only the gentle hum of machines breaks the silence, I find myself contemplating the artistry inherent in well-written code...",
      author: "Friedrich Dev",
      date: "September 20, 2025",
      category: "Philosophy",
      readTime: "8 min"
    },
    {
      id: 2,
      title: "The Melancholy of Legacy Systems",
      excerpt:
        "There exists a peculiar sadness in maintaining code written by those who came before us. Like archaeologists of the digital age, we unearth layers of logic, each telling a story...",
      author: "Friedrich Dev",
      date: "September 15, 2025",
      category: "Reflection",
      readTime: "12 min"
    },
    {
      id: 3,
      title: "Modern Development: A Study in Contradictions",
      excerpt:
        "We live in an age where frameworks rise and fall like empires, where yesterday's revolutionary approach becomes today's technical debt. Yet in this chaos, patterns emerge...",
      author: "Friedrich Dev",
      date: "September 10, 2025",
      category: "Technology",
      readTime: "15 min"
    }
  ];

  const categories = ["All", "Philosophy", "Reflection", "Technology", "Craft"];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isLightMode
        ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
        : "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"}`}
    >
      {/* Header */}
      <header
        className={`border-b-2 ${isLightMode
          ? "border-amber-200 bg-white/70"
          : "border-slate-700 bg-slate-900/70"} backdrop-blur-sm`}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen
                className={`w-8 h-8 ${isLightMode
                  ? "text-amber-800"
                  : "text-amber-400"}`}
              />
              <h1
                className={`text-4xl font-serif font-bold ${isLightMode
                  ? "text-gray-800"
                  : "text-gray-100"}`}
              >
                The Developer's Codex
              </h1>
            </div>
            <Feather
              className={`w-6 h-6 ${isLightMode
                ? "text-amber-600"
                : "text-amber-400"}`}
            />
          </div>
          <p
            className={`mt-4 text-lg font-serif italic ${isLightMode
              ? "text-gray-600"
              : "text-gray-300"}`}
          >
            "Musings on the craft of programming, penned in the quiet
            contemplation of code"
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h3
            className={`text-xl font-serif mb-4 ${isLightMode
              ? "text-gray-800"
              : "text-gray-200"}`}
          >
            Browse by Theme
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map(category =>
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-serif transition-all duration-200 ${selectedCategory ===
                category
                  ? isLightMode
                    ? "bg-amber-200 text-amber-900 shadow-md"
                    : "bg-amber-900 text-amber-100 shadow-md"
                  : isLightMode
                    ? "bg-white text-gray-700 border border-gray-300 hover:bg-amber-50 hover:border-amber-300"
                    : "bg-slate-800 text-gray-300 border border-slate-600 hover:bg-slate-700 hover:border-slate-500"}`}
              >
                {category}
              </button>
            )}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {filteredPosts.map(post =>
            <article
              key={post.id}
              className={`p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer border-l-4 ${isLightMode
                ? "bg-white border-l-amber-400 hover:bg-amber-50"
                : "bg-slate-800 border-l-amber-500 hover:bg-slate-750"}`}
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2
                    className={`text-2xl font-serif font-bold mb-2 leading-tight ${isLightMode
                      ? "text-gray-800"
                      : "text-gray-100"}`}
                  >
                    {post.title}
                  </h2>

                  {/* Meta Info */}
                  <div
                    className={`flex flex-wrap items-center gap-4 text-sm ${isLightMode
                      ? "text-gray-600"
                      : "text-gray-400"}`}
                  >
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="font-serif">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-serif">
                        {post.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span className="font-serif">
                        {post.category}
                      </span>
                    </div>
                    <span className="font-serif italic">
                      {post.readTime} read
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`w-5 h-5 ml-4 flex-shrink-0 ${isLightMode
                    ? "text-gray-400"
                    : "text-gray-500"}`}
                />
              </div>

              {/* Excerpt */}
              <p
                className={`font-serif text-lg leading-relaxed ${isLightMode
                  ? "text-gray-700"
                  : "text-gray-300"}`}
              >
                {post.excerpt}
              </p>

              {/* Read More */}
              <div className="mt-6">
                <span
                  className={`inline-flex items-center gap-2 font-serif text-sm font-medium transition-colors ${isLightMode
                    ? "text-amber-700 hover:text-amber-900"
                    : "text-amber-400 hover:text-amber-300"}`}
                >
                  Continue Reading
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          )}
        </div>

        {/* Footer Quote */}
        <div
          className={`mt-16 text-center py-8 border-t ${isLightMode
            ? "border-amber-200"
            : "border-slate-700"}`}
        >
          <blockquote
            className={`font-serif italic text-lg ${isLightMode
              ? "text-gray-600"
              : "text-gray-400"}`}
          >
            "In every line of code, there lies a story waiting to be told,<br />
            and in every bug, a lesson waiting to be learned."
          </blockquote>
          <cite
            className={`block mt-2 font-serif text-sm ${isLightMode
              ? "text-gray-500"
              : "text-gray-500"}`}
          >
            — The Developer's Codex
          </cite>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
