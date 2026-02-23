import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  PenSquare,
  Users,
  Search,
  HelpCircle,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import Sidebar from "../../../components/app/Sidebar";
import type { Post } from "../types";
import {
  getPosts,
  getCurrentUser,
  likePost,
  initializeSampleData,
} from "../utils";
import PostCard from "../components/PostCard";
import CommunitySidebar from "../components/CommunitySidebar";
import CategoryFilter from "../components/CategoryFilter";

const CATEGORIES = [
  { id: "all", label: "All Posts", icon: Users },
  { id: "question", label: "Questions", icon: HelpCircle },
  { id: "tip", label: "Study Tips", icon: Lightbulb },
  { id: "help", label: "Need Help", icon: BookOpen },
];

export default function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = getCurrentUser();

  useEffect(() => {
    initializeSampleData();
    loadPosts();
  }, []);

  const loadPosts = () => {
    const allPosts = getPosts();
    setPosts(allPosts);
  };

  const handleLike = (postId: string) => {
    if (!currentUser) return;
    likePost(postId, currentUser.id);
    loadPosts();
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "question" && post.isQuestion) ||
      (activeCategory === "tip" && !post.isQuestion && post.content.toLowerCase().includes("tip")) ||
      (activeCategory === "help" && post.content.toLowerCase().includes("help"));

    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Sidebar>
      <div className="min-h-screen bg-[#f8f9fc] dark:bg-gray-950 transition-colors duration-500">
        {/* Mobile Header (Sticky) */}
        <header className="lg:hidden sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Brillia Community
          </h1>
          <button
            onClick={() => navigate("/community/create")}
            className="p-2 bg-purple-600 text-white rounded-full shadow-lg shadow-purple-500/20"
          >
            <PenSquare className="h-5 w-5" />
          </button>
        </header>

        <div className="w-full mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Navigation & Filters (On Desktop) */}
            <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
              <div className="hidden lg:block sticky top-24 space-y-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 px-2">Feed</h2>
                  <nav className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${activeCategory === cat.id
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                          : "text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600"
                          }`}
                      >
                        <cat.icon className="h-5 w-5" />
                        {cat.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <button
                  onClick={() => navigate("/community/create")}
                  className="w-full py-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-3xl font-bold shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <PenSquare className="h-5 w-5" />
                  Create Post
                </button>
              </div>

              {/* Mobile Category Scroll */}
              <div className="lg:hidden">
                <CategoryFilter
                  categories={CATEGORIES}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>
            </div>

            {/* Center Column: Feed */}
            <main className="flex-1 w-full mx-auto lg:mx-0 space-y-6">
              {/* Search Bar (Static on Mobile, Hidden on Sidebar Desktop) */}
              <div className="xl:hidden relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search posts, questions, or people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm text-sm transition-all"
                />
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                  <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Quiet in here...
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">
                    Be the first to share something with the Brillia community!
                  </p>
                  <button
                    onClick={() => navigate("/community/create")}
                    className="px-8 py-3 bg-purple-600 text-white rounded-2xl font-bold hover:opacity-90 transition-opacity"
                  >
                    Start a Conversation
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUser={currentUser}
                      onLike={handleLike}
                    />
                  ))}
                </div>
              )}
            </main>

            {/* Right Column: Trending & Suggestions */}
            <CommunitySidebar />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
