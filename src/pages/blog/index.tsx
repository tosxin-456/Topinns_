import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Feather,
  Calendar,
  User,
  ChevronRight,
  Grid3X3,
  List,
  LayoutGrid,
  Clock,
  Eye,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogPosts, BlogPost } from "../../utils/blogs";

interface BlogPageProps {
  isLightMode?: boolean;
}

type ViewMode = "list" | "grid" | "compact";

const BlogPage: React.FC<BlogPageProps> = ({ isLightMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load view mode from localStorage on component mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem("blog-view-mode") as ViewMode;
    if (savedViewMode && ["list", "grid", "compact"].includes(savedViewMode)) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode to localStorage whenever it changes
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("blog-view-mode", mode);
  };

  const categories = ["All", "Philosophy", "Reflection", "Technology", "Craft"];

const filteredPosts: BlogPost[] =
  selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const ViewModeButton = ({
    mode,
    icon: Icon,
    label
  }: {
    mode: ViewMode;
    icon: React.ElementType;
    label: string;
  }) =>
    <button
      onClick={() => handleViewModeChange(mode)}
      className={`p-3 rounded-xl transition-all duration-200 group relative ${viewMode ===
      mode
        ? isLightMode
          ? "bg-amber-100 text-amber-800 shadow-md border-2 border-amber-200"
          : "bg-amber-900/30 text-amber-300 shadow-md border-2 border-amber-600"
        : isLightMode
          ? "bg-white/70 text-gray-600 hover:bg-amber-50 hover:text-amber-700 border-2 border-transparent hover:border-amber-200"
          : "bg-slate-800/70 text-gray-400 hover:bg-slate-700 hover:text-gray-300 border-2 border-transparent hover:border-slate-600"}`}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </button>;

  const renderListView = () => <div className="space-y-6">
      {filteredPosts.map(post =>
        <article
          key={post.id}
          onClick={() => navigate(`/blog/${post.id}`)}
          onMouseEnter={() => setHoveredCard(post.id.toString())}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group p-8 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border ${isLightMode
            ? "bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-2xl hover:bg-white/90"
            : "bg-slate-800/80 backdrop-blur-sm border-slate-700/50 hover:shadow-2xl hover:bg-slate-800/90"} ${hoveredCard ===
          post.id.toString()
            ? "transform scale-[1.02]"
            : ""}`}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${isLightMode
                    ? "bg-amber-100 text-amber-800"
                    : "bg-amber-900/30 text-amber-300"}`}
                >
                  {post.category}
                </span>
                <div
                  className={`flex items-center gap-2 text-sm ${isLightMode
                    ? "text-gray-500"
                    : "text-gray-400"}`}
                >
                  <Clock className="w-4 h-4" />
                  <span>
                    {post.readTime}
                  </span>
                </div>
              </div>

              <h2
                className={`text-2xl font-bold mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r ${isLightMode
                  ? "text-gray-800 group-hover:from-amber-600 group-hover:to-orange-600"
                  : "text-gray-100 group-hover:from-amber-400 group-hover:to-yellow-400"} group-hover:bg-clip-text transition-all duration-300`}
              >
                {post.title}
              </h2>

              <div
                className={`flex flex-wrap items-center gap-4 text-sm mb-4 ${isLightMode
                  ? "text-gray-600"
                  : "text-gray-400"}`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>
                    {post.author}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {post.date}
                  </span>
                </div>
              </div>
            </div>

            <ChevronRight
              className={`w-6 h-6 ml-4 flex-shrink-0 transition-transform duration-200 ${hoveredCard ===
              post.id.toString()
                ? "transform translate-x-1"
                : ""} ${isLightMode ? "text-gray-400" : "text-gray-500"}`}
            />
          </div>

          <p
            className={`text-lg leading-relaxed ${isLightMode
              ? "text-gray-700"
              : "text-gray-300"}`}
          >
            {post.excerpt}
          </p>

          <div className="mt-6 flex justify-between items-center">
            <span
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isLightMode
                ? "text-amber-700 group-hover:text-amber-900"
                : "text-amber-400 group-hover:text-amber-300"}`}
            >
              Continue Reading
              <ChevronRight className="w-4 h-4" />
            </span>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-1 text-sm ${isLightMode
                  ? "text-gray-500"
                  : "text-gray-400"}`}
              >
                <Eye className="w-4 h-4" />
                <span>
                  {Math.floor(Math.random() * 1000) + 100}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${isLightMode
                  ? "text-gray-500"
                  : "text-gray-400"}`}
              >
                <Heart className="w-4 h-4" />
                <span>
                  {Math.floor(Math.random() * 50) + 5}
                </span>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>;

  const renderGridView = () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPosts.map(post =>
        <article
          key={post.id}
          onClick={() => navigate(`/blog/${post.id}`)}
          onMouseEnter={() => setHoveredCard(post.id.toString())}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border h-full flex flex-col ${isLightMode
            ? "bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-2xl hover:bg-white/90"
            : "bg-slate-800/80 backdrop-blur-sm border-slate-700/50 hover:shadow-2xl hover:bg-slate-800/90"} ${hoveredCard ===
          post.id.toString()
            ? "transform scale-105"
            : ""}`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${isLightMode
                ? "bg-amber-100 text-amber-800"
                : "bg-amber-900/30 text-amber-300"}`}
            >
              {post.category}
            </span>
            <div
              className={`flex items-center gap-1 text-xs ${isLightMode
                ? "text-gray-500"
                : "text-gray-400"}`}
            >
              <Clock className="w-3 h-3" />
              <span>
                {post.readTime}
              </span>
            </div>
          </div>

          <h3
            className={`text-lg font-bold mb-3 leading-tight flex-grow group-hover:text-transparent group-hover:bg-gradient-to-r ${isLightMode
              ? "text-gray-800 group-hover:from-amber-600 group-hover:to-orange-600"
              : "text-gray-100 group-hover:from-amber-400 group-hover:to-yellow-400"} group-hover:bg-clip-text transition-all duration-300`}
          >
            {post.title}
          </h3>

          <p
            className={`text-sm leading-relaxed mb-4 line-clamp-3 ${isLightMode
              ? "text-gray-600"
              : "text-gray-400"}`}
          >
            {post.excerpt}
          </p>

          <div
            className={`flex justify-between items-center text-xs mt-auto pt-4 border-t ${isLightMode
              ? "border-gray-200 text-gray-500"
              : "border-slate-700 text-gray-400"}`}
          >
            <span>
              {post.date}
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>
                  {Math.floor(Math.random() * 1000) + 100}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>
                  {Math.floor(Math.random() * 50) + 5}
                </span>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>;

  const renderCompactView = () => <div className="space-y-4">
      {filteredPosts.map(post =>
        <article
          key={post.id}
          onClick={() => navigate(`/blog/${post.id}`)}
          onMouseEnter={() => setHoveredCard(post.id.toString())}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group p-6 rounded-xl shadow-md transition-all duration-200 cursor-pointer border ${isLightMode
            ? "bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg hover:bg-white/80"
            : "bg-slate-800/70 backdrop-blur-sm border-slate-700/50 hover:shadow-lg hover:bg-slate-800/80"} ${hoveredCard ===
          post.id.toString()
            ? "transform translateX-2"
            : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3
                  className={`text-lg font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r ${isLightMode
                    ? "text-gray-800 group-hover:from-amber-600 group-hover:to-orange-600"
                    : "text-gray-100 group-hover:from-amber-400 group-hover:to-yellow-400"} group-hover:bg-clip-text transition-all duration-300`}
                >
                  {post.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${isLightMode
                    ? "bg-amber-100 text-amber-800"
                    : "bg-amber-900/30 text-amber-300"}`}
                >
                  {post.category}
                </span>
              </div>

              <div
                className={`flex items-center gap-4 text-sm ${isLightMode
                  ? "text-gray-600"
                  : "text-gray-400"}`}
              >
                <span>
                  {post.date}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {post.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>
                    {Math.floor(Math.random() * 1000) + 100}
                  </span>
                </div>
              </div>
            </div>

            <ChevronRight
              className={`w-5 h-5 ml-4 flex-shrink-0 transition-transform duration-200 ${hoveredCard ===
              post.id.toString()
                ? "transform translate-x-1"
                : ""} ${isLightMode ? "text-gray-400" : "text-gray-500"}`}
            />
          </div>
        </article>
      )}
    </div>;

  return (
    <div
      className={`min-h-screen transition-colors mt-6 lg:mt-14 duration-300 ${isLightMode
        ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
        : "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"}`}
    >
      {/* Header */}
      <header
        className={`border-b backdrop-blur-md ${isLightMode
          ? "border-amber-200/50 bg-white/30"
          : "border-slate-700/50 bg-slate-900/30"}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-2xl ${isLightMode
                  ? "bg-amber-100"
                  : "bg-amber-900/30"}`}
              >
                <BookOpen
                  className={`w-8 h-8 ${isLightMode
                    ? "text-amber-800"
                    : "text-amber-400"}`}
                />
              </div>
              <div>
                <h1
                  className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isLightMode
                    ? "from-gray-800 to-gray-600"
                    : "from-gray-100 to-gray-300"}`}
                >
                  The Developer's Codex
                </h1>
                <p
                  className={`text-lg italic ${isLightMode
                    ? "text-gray-600"
                    : "text-gray-400"}`}
                >
                  Musings on the craft of programming
                </p>
              </div>
            </div>
            <Feather
              className={`w-6 h-6 ${isLightMode
                ? "text-amber-600"
                : "text-amber-400"}`}
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          {/* Category Filter */}
          <div>
            <h3
              className={`text-xl font-semibold mb-4 ${isLightMode
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
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory ===
                  category
                    ? isLightMode
                      ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg"
                      : "bg-gradient-to-r from-amber-600 to-yellow-500 text-gray-900 shadow-lg"
                    : isLightMode
                      ? "bg-white/70 text-gray-700 border border-gray-200 hover:bg-amber-50 hover:border-amber-300"
                      : "bg-slate-800/70 text-gray-300 border border-slate-600 hover:bg-slate-700 hover:border-slate-500"}`}
                >
                  {category}
                </button>
              )}
            </div>
          </div>

          {/* View Mode Selector */}
          <div>
            <h3
              className={`text-xl font-semibold mb-4 ${isLightMode
                ? "text-gray-800"
                : "text-gray-200"}`}
            >
              View Mode
            </h3>
            <div className="flex gap-2">
              <ViewModeButton mode="list" icon={List} label="List View" />
              <ViewModeButton mode="grid" icon={LayoutGrid} label="Grid View" />
              <ViewModeButton
                mode="compact"
                icon={Grid3X3}
                label="Compact View"
              />
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {viewMode === "list" && renderListView()}
        {viewMode === "grid" && renderGridView()}
        {viewMode === "compact" && renderCompactView()}

        {/* Footer Quote */}
        <div
          className={`mt-16 text-center py-8 border-t ${isLightMode
            ? "border-amber-200/50"
            : "border-slate-700/50"}`}
        >
          <blockquote
            className={`text-lg italic mb-3 ${isLightMode
              ? "text-gray-600"
              : "text-gray-400"}`}
          >
            "In every line of code, there lies a story waiting to be told,<br />
            and in every bug, a lesson waiting to be learned."
          </blockquote>
          <cite
            className={`block text-sm ${isLightMode
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
