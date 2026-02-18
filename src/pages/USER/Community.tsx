import Sidebar from "@/components/app/Sidebar";
import BottomNav from "@/components/app/BottomNav";
import { useState, useEffect } from "react";
import {
  MessageCircle,
  Heart,
  Send,
  MoreHorizontal,
  Search,
  Plus,
  X,
  Users,
  HelpCircle,
  Lightbulb,
  BookOpen,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    grade?: string;
  };
  content: string;
  category: "question" | "discussion" | "tip" | "help";
  likes: number;
  comments: Comment[];
  timestamp: string;
  liked: boolean;
  bookmarked: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

const CATEGORIES = [
  { id: "all", label: "All Posts", icon: Users },
  { id: "question", label: "Questions", icon: HelpCircle },
  { id: "discussion", label: "Discussions", icon: MessageCircle },
  { id: "tip", label: "Study Tips", icon: Lightbulb },
  { id: "help", label: "Need Help", icon: BookOpen },
];

// Sample posts data
const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    author: { name: "Sarah M.", avatar: "S", grade: "Grade 8" },
    content: "Can someone explain the Pythagorean theorem in simple terms? I'm struggling with the math homework 😅",
    category: "question",
    likes: 12,
    comments: [
      {
        id: "c1",
        author: { name: "Alex K.", avatar: "A" },
        content: "It's basically a² + b² = c² where c is the longest side of a right triangle! Think of it like finding the diagonal of a rectangle 📐",
        timestamp: "2h ago",
        likes: 8,
      },
      {
        id: "c2",
        author: { name: "Mike R.", avatar: "M" },
        content: "There's a great video on our resources page that explains it with animations!",
        timestamp: "1h ago",
        likes: 3,
      },
    ],
    timestamp: "3h ago",
    liked: false,
    bookmarked: false,
  },
  {
    id: "2",
    author: { name: "James L.", avatar: "J", grade: "Grade 7" },
    content: "💡 Study tip: I've found that studying for 25 minutes then taking a 5-minute break really helps me focus better. It's called the Pomodoro technique! Try it out!",
    category: "tip",
    likes: 45,
    comments: [
      {
        id: "c3",
        author: { name: "Emma T.", avatar: "E" },
        content: "This works so well! Been using it for a week now 🍅",
        timestamp: "5h ago",
        likes: 12,
      },
    ],
    timestamp: "6h ago",
    liked: true,
    bookmarked: true,
  },
  {
    id: "3",
    author: { name: "Emily W.", avatar: "E", grade: "Grade 8" },
    content: "Who else is studying for the Science test next week? Let's create a study group! Drop a comment if you're interested 📚",
    category: "discussion",
    likes: 28,
    comments: [
      {
        id: "c4",
        author: { name: "David K.", avatar: "D" },
        content: "Count me in! I need help with the chemistry section",
        timestamp: "30m ago",
        likes: 5,
      },
    ],
    timestamp: "1d ago",
    liked: false,
    bookmarked: false,
  },
  {
    id: "4",
    author: { name: "Chris P.", avatar: "C", grade: "Grade 6" },
    content: "I'm really struggling with English grammar, especially commas and semicolons. Can anyone recommend good resources or explain when to use each? 🙏",
    category: "help",
    likes: 15,
    comments: [],
    timestamp: "2d ago",
    liked: false,
    bookmarked: false,
  },
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState<Post["category"]>("question");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState<{ name: string; grade?: string } | null>(null);

  useEffect(() => {
    const rawUserDetails = localStorage.getItem("user-info");
    if (rawUserDetails) {
      setUser(JSON.parse(rawUserDetails));
    }

    // Load saved posts from localStorage
    const savedPosts = localStorage.getItem("community-posts");
    if (savedPosts) {
      setPosts([...JSON.parse(savedPosts), ...SAMPLE_POSTS]);
    }
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!newPostContent.trim() || !user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        avatar: user.name.charAt(0).toUpperCase(),
        grade: user.grade,
      },
      content: newPostContent,
      category: newPostCategory,
      likes: 0,
      comments: [],
      timestamp: "Just now",
      liked: false,
      bookmarked: false,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    
    // Save user posts to localStorage
    const userPosts = updatedPosts.filter(p => !SAMPLE_POSTS.find(sp => sp.id === p.id));
    localStorage.setItem("community-posts", JSON.stringify(userPosts));

    setNewPostContent("");
    setShowNewPost(false);
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        avatar: user.name.charAt(0).toUpperCase(),
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
    setNewComment("");
  };

  const getCategoryColor = (category: Post["category"]) => {
    switch (category) {
      case "question": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "discussion": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "tip": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "help": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24 lg:pb-8">
        {/* Header */}
        <header className="sticky top-0 lg:top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 pt-16 lg:pt-0">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-500" />
                <h1 className="text-xl lg:text-2xl font-bold">Community</h1>
              </div>
              <button
                onClick={() => setShowNewPost(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Post</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-700 transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Posts Feed */}
        <main className="max-w-3xl mx-auto px-4 lg:px-8 py-6 space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">No posts found</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Be the first to start a conversation!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Post Header */}
                <div className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {post.author.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{post.author.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          {post.author.grade && <span>{post.author.grade}</span>}
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </span>
                      <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{post.content}</p>
                </div>

                {/* Post Actions */}
                <div className="px-4 pb-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-700/50 pt-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                        post.liked
                          ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.comments.length}</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      post.bookmarked
                        ? "text-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.bookmarked ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Comments Section */}
                {expandedPost === post.id && (
                  <div className="border-t border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/30">
                    {/* Existing Comments */}
                    {post.comments.length > 0 && (
                      <div className="p-4 space-y-3">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {comment.author.avatar}
                            </div>
                            <div className="flex-1 bg-white dark:bg-gray-700/50 rounded-xl p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-xs">{comment.author.name}</span>
                                <span className="text-xs text-gray-400">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                              <button className="flex items-center gap-1 mt-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{comment.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment */}
                    <div className="p-4 pt-0">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {user?.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                            className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComment.trim()}
                            className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </main>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-2xl shadow-xl max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold">Create Post</h2>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.slice(1).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setNewPostCategory(cat.id as Post["category"])}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          newPostCategory === cat.id
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Post Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What's on your mind?
                  </label>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share a question, tip, or start a discussion..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Post Button */}
                <button
                  onClick={handleNewPost}
                  disabled={!newPostContent.trim()}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </Sidebar>
  );
};

export default Community;
