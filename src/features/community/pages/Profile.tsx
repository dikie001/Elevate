import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Heart,
  MessageCircle,
  Settings,
  UserPlus,
  MoreHorizontal,
  Grid,
  Bookmark,
} from "lucide-react";
import Sidebar from "../../../components/app/Sidebar";
import type { Post, User } from "../types";
import { getPosts, getCurrentUser, formatTimeAgo, likePost } from "../utils";

export default function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUser = getCurrentUser();

  const isOwnProfile = !userId || userId === currentUser?.id || userId === "me";

  useEffect(() => {
    loadProfile();
    loadUserPosts();
  }, [userId]);

  const loadProfile = () => {
    if (isOwnProfile && currentUser) {
      setUser(currentUser);
    } else {
      // For demo, create a sample user based on posts
      const allPosts = getPosts();
      const userPost = allPosts.find((p) => p.authorId === userId);
      if (userPost) {
        setUser({
          id: userPost.authorId,
          name: userPost.authorName,
          avatar: userPost.authorAvatar,
          grade: userPost.authorGrade,
          bio: "Passionate learner | Science enthusiast | Always curious 🚀",
          joinedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
          followersCount: Math.floor(Math.random() * 100) + 10,
          followingCount: Math.floor(Math.random() * 50) + 5,
          postsCount: allPosts.filter((p) => p.authorId === userId).length,
        });
      }
    }
  };

  const loadUserPosts = () => {
    const allPosts = getPosts();
    const targetId = isOwnProfile ? currentUser?.id : userId;
    const userPosts = allPosts.filter((p) => p.authorId === targetId);
    setPosts(userPosts);
  };

  const handleLike = (postId: string) => {
    if (!currentUser) return;
    likePost(postId, currentUser.id);
    loadUserPosts();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            User not found
          </h2>
          <button
            onClick={() => navigate("/community")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Community
          </button>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile
              </h1>
            </div>
            {isOwnProfile && (
              <button
                onClick={() => navigate("/settings")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            )}
          </div>
        </header>

        <main className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400" />

            {/* Profile Info */}
            <div className="px-4 pb-4">
              <div className="flex justify-between items-end -mt-12 mb-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                    {getInitials(user.name)}
                  </div>
                )}
                {isOwnProfile ? (
                  <button
                    onClick={() => navigate("/settings")}
                    className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                        isFollowing
                          ? "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:text-red-500"
                          : "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                      }`}
                    >
                      <UserPlus className="h-4 w-4" />
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                    <button className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <MoreHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                )}
              </div>

              {/* Name & Bio */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              {user.grade && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {user.grade}
                </p>
              )}
              {user.bio && (
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  {user.bio}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined{" "}
                  {new Date(user.joinedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4">
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {posts.length}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Posts
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {user.followersCount}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Followers
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {user.followingCount}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Following
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("posts")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === "posts"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Grid className="h-4 w-4" />
                Posts
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === "saved"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Bookmark className="h-4 w-4" />
                Saved
              </button>
            </div>
          </div>

          {/* Posts Grid/List */}
          <div className="p-4 space-y-4">
            {activeTab === "posts" && posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  {isOwnProfile
                    ? "You haven't posted anything yet."
                    : "No posts yet."}
                </p>
                {isOwnProfile && (
                  <button
                    onClick={() => navigate("/community/create")}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    Create Post
                  </button>
                )}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  {isOwnProfile
                    ? "Posts you save will appear here."
                    : "Saved posts are private."}
                </p>
              </div>
            )}

            {activeTab === "posts" &&
              posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/community/post/${post.id}`} className="block p-4">
                    <p className="text-gray-800 dark:text-gray-200 text-[15px] leading-relaxed line-clamp-4">
                      {post.content}
                    </p>
                    {post.isQuestion && (
                      <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
                        <MessageCircle className="h-3 w-3" />
                        Question
                      </span>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {formatTimeAgo(post.createdAt)}
                    </p>
                  </Link>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post attachment"
                      className="w-full max-h-64 object-cover"
                    />
                  )}
                  <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-6">
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
                  </div>
                </article>
              ))}
          </div>
        </main>
      </div>
    </Sidebar>
  );
}
