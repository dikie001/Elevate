import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share2,
  PenSquare,
  Bookmark,
  TrendingUp,
  Users,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import Sidebar from "../../../components/app/Sidebar";
import type { Post } from "../types";
import {
  getPosts,
  getCurrentUser,
  likePost,
  initializeSampleData,
  formatTimeAgo,
} from "../utils";

export default function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "questions" | "following">(
    "all",
  );
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
    if (activeTab === "questions") return post.isQuestion;
    if (searchQuery) {
      return (
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.authorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Community
              </h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/community/messages")}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => navigate("/community/create")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <PenSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Post</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, questions, or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Filter className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { id: "all", label: "For You", icon: TrendingUp },
                { id: "questions", label: "Questions", icon: MessageCircle },
                { id: "following", label: "Following", icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Posts Feed */}
        <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Be the first to start a conversation!
              </p>
              <button
                onClick={() => navigate("/community/create")}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Create Post
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Post Header */}
                <div className="p-4 flex items-start justify-between">
                  <Link
                    to={`/community/profile/${post.authorId}`}
                    className="flex items-center gap-3"
                  >
                    {post.authorAvatar ? (
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(post.authorName)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {post.authorName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        {post.authorGrade && <span>{post.authorGrade}</span>}
                        <span>·</span>
                        <span>{formatTimeAgo(post.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                  <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                {/* Post Content */}
                <Link
                  to={`/community/post/${post.id}`}
                  className="block px-4 pb-3"
                >
                  <p className="text-gray-800 dark:text-gray-200 text-[15px] leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                  {post.isQuestion && (
                    <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
                      <MessageCircle className="h-3 w-3" />
                      Question
                    </span>
                  )}
                  {post.subject && (
                    <span className="inline-flex items-center gap-1 mt-2 ml-2 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                      {post.subject}
                    </span>
                  )}
                </Link>

                {/* Post Image */}
                {post.image && (
                  <Link to={`/community/post/${post.id}`}>
                    <img
                      src={post.image}
                      alt="Post attachment"
                      className="w-full max-h-96 object-cover"
                    />
                  </Link>
                )}

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          currentUser && post.likes.includes(currentUser.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                      <span className="text-sm">{post.likes.length}</span>
                    </button>
                    <Link
                      to={`/community/post/${post.id}`}
                      className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">{post.comments.length}</span>
                    </Link>
                    <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </article>
            ))
          )}
        </main>
      </div>
    </Sidebar>
  );
}
