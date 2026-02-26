import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, HelpCircle, Lightbulb, BookOpen, Search } from "lucide-react";
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
import Sidebar from "@/components/app/Sidebar";

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
      (activeCategory === "tip" &&
        !post.isQuestion &&
        post.content.toLowerCase().includes("tip")) ||
      (activeCategory === "help" &&
        post.content.toLowerCase().includes("help"));

    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Sidebar>
      <div className="min-h-screen bg-muted/30 dark:bg-zinc-950/20 transition-colors duration-500 pb-20 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Center Column (Feed) */}
            <main className="flex-1 min-w-0 space-y-6">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type="text"
                  placeholder="Search posts or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm text-sm"
                />
              </div>

              {/* Create Post Box */}
              <div className="bg-card text-card-foreground rounded-lg border border-border p-4 shadow-sm">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                    {currentUser ? currentUser.name[0].toUpperCase() : "U"}
                  </div>
                  <button
                    onClick={() => navigate("/community/create")}
                    className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground text-left px-4 rounded-full transition-colors"
                  >
                    What's on your mind, {currentUser?.name.split(" ")[0]}?
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="sticky top-0 z-20 bg-muted/30 dark:bg-background/95 backdrop-blur-sm py-2 px-1 -mx-1">
                <CategoryFilter
                  categories={CATEGORIES}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-lg border border-border shadow-sm">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Quiet in here...
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                    Be the first to share something with the Brillia community!
                  </p>
                  <button
                    onClick={() => navigate("/community/create")}
                    className="px-8 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    Start a Conversation
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
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

            {/* Right Column (Trending/Widgets) */}
            <aside className="hidden xl:block w-[300px] flex-shrink-0 sticky top-6 self-start">
              <CommunitySidebar />
            </aside>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
