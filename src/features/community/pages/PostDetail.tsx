import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  Share2,
  Send,
  MoreHorizontal,
  Trash2,
  Heart,
  X,
  Image as ImageIcon,
  Smile,
  Camera,
} from "lucide-react";
import Sidebar from "@/components/app/Sidebar";
import type { Post } from "../types";
import {
  getPostById,
  getCurrentUser,
  reactToPost,
  addComment,
  addReply,
  deletePost,
  formatTimeAgo,
} from "../utils";
import ReactionButton from "../components/ReactionButton";
import ImageGrid from "../components/ImageGrid";
import { toast } from "sonner";

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  const loadPost = useCallback(() => {
    const foundPost = getPostById(postId!);
    setPost(foundPost || null);
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId, loadPost]);

  const handleReact = (postId: string, reactionType: string) => {
    if (!currentUser) return;
    reactToPost(postId, currentUser.id, reactionType);
    loadPost();
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !post || !newComment.trim()) return;

    if (replyTo) {
      addReply(post.id, replyTo.id, {
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        content: newComment.trim(),
      });
      setReplyTo(null);
    } else {
      addComment(post.id, {
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        content: newComment.trim(),
      });
    }

    setNewComment("");
    loadPost();
    toast.success("Comment added!");
  };

  const handleDelete = () => {
    if (!post) return;
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
      toast.success("Post deleted");
      navigate("/community");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </Sidebar>
    );
  }

  if (!post) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Post not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            This post may have been deleted.
          </p>
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 lg:pb-4">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Post
            </h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-4">
          {/* Main Post */}
          <article className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-4">
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
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                    {getInitials(post.authorName)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {post.authorName}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    {post.authorGrade && <span>{post.authorGrade}</span>}
                    <span>·</span>
                    <span>{formatTimeAgo(post.createdAt)}</span>
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-1">
                {currentUser && post.authorId === currentUser.id && (
                  <button
                    onClick={handleDelete}
                    className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.isQuestion && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
                    <MessageCircle className="h-3 w-3" />
                    Question
                  </span>
                )}
                {post.subject && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                    {post.subject}
                  </span>
                )}
              </div>
            </div>

            {/* Post Images */}
            {post.images && post.images.length > 0 ? (
              <ImageGrid images={post.images} />
            ) : post.image ? (
              <ImageGrid images={[post.image]} />
            ) : null}

            {/* Post Stats */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {(post.likes.length || 0) +
                    (post.reactions
                      ? Object.values(post.reactions).reduce(
                          (acc, users) => acc + users.length,
                          0,
                        )
                      : 0)}
                </span>
                <span>reactions</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{post.comments.length} comments</span>
                <span>{Math.floor(Math.random() * 10)} shares</span>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-1 py-1 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <ReactionButton
                currentReaction={
                  currentUser && post.reactions
                    ? Object.keys(post.reactions).find((type) =>
                        post.reactions![type].includes(currentUser.id),
                      )
                    : undefined
                }
                isLiked={!!(currentUser && post.likes.includes(currentUser.id))}
                onReact={(type) => handleReact(post.id, type)}
              />
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-purple-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold text-sm">Comment</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 transition-colors">
                <Share2 className="h-5 w-5" />
                <span className="font-semibold text-sm">Share</span>
              </button>
            </div>
          </article>

          {/* Comments Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Comments ({post.comments.length})
              </h3>
            </div>

            {/* Comments List */}
            <div className="bg-white dark:bg-gray-800">
              {post.comments.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <div className="mb-2 flex justify-center">
                    <MessageCircle className="h-10 w-10 opacity-20" />
                  </div>
                  <p className="text-sm font-medium">No comments yet</p>
                  <p className="text-xs opacity-60">
                    Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                <div className="px-4 py-2 space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2">
                      {/* Avatar */}
                      <Link
                        to={`/community/profile/${comment.authorId}`}
                        className="flex-shrink-0 mt-1"
                      >
                        {comment.authorAvatar ? (
                          <img
                            src={comment.authorAvatar}
                            alt={comment.authorName}
                            className="w-8 h-8 rounded-full object-cover border border-gray-100 dark:border-gray-700"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium text-xs">
                            {getInitials(comment.authorName)}
                          </div>
                        )}
                      </Link>

                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className="inline-flex flex-col bg-gray-100 dark:bg-gray-700/70 rounded-2xl px-3 py-2 max-w-[95%] shadow-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                          <Link
                            to={`/community/profile/${comment.authorId}`}
                            className="font-bold text-gray-900 dark:text-gray-100 text-xs hover:underline truncate"
                          >
                            {comment.authorName}
                          </Link>
                          <p className="text-gray-800 dark:text-gray-200 text-[13px] leading-snug break-words">
                            {comment.content}
                          </p>
                        </div>

                        {/* Interaction Bar */}
                        <div className="flex items-center gap-3 mt-1 ml-2 text-[11px] font-bold text-gray-500 dark:text-gray-400">
                          <button className="hover:underline hover:text-purple-600 transition-colors">
                            Like
                          </button>
                          <button
                            onClick={() => {
                              setReplyTo({
                                id: comment.id,
                                name: comment.authorName,
                              });
                              document.querySelector("input")?.focus();
                            }}
                            className="hover:underline hover:text-purple-600 transition-colors"
                          >
                            Reply
                          </button>
                          <span className="font-normal opacity-70">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                          {comment.likes && comment.likes.length > 0 && (
                            <div className="flex items-center gap-0.5 ml-auto bg-white dark:bg-gray-800 shadow-sm rounded-full px-1.5 py-0.5 border border-gray-100 dark:border-gray-700">
                              <Heart className="h-2.5 w-2.5 text-red-500 fill-red-500" />
                              <span className="text-[10px]">
                                {comment.likes.length}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-3 space-y-3 pl-2 border-l-2 border-gray-100 dark:border-gray-700 ml-1">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-2">
                                <Link
                                  to={`/community/profile/${reply.authorId}`}
                                  className="flex-shrink-0 mt-1"
                                >
                                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] font-bold border border-white dark:border-gray-800">
                                    {getInitials(reply.authorName)}
                                  </div>
                                </Link>
                                <div className="flex-1 min-w-0">
                                  <div className="inline-flex flex-col bg-gray-50 dark:bg-gray-900/40 rounded-2xl px-3 py-1.5 max-w-[95%] border border-gray-100 dark:border-gray-800/50">
                                    <span className="font-bold text-[11px] text-gray-900 dark:text-gray-100 truncate">
                                      {reply.authorName}
                                    </span>
                                    <p className="text-[12px] text-gray-700 dark:text-gray-300 leading-snug break-words">
                                      {reply.content}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3 mt-1 ml-2 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                                    <button className="hover:underline hover:text-purple-600 transition-colors">
                                      Like
                                    </button>
                                    <button
                                      onClick={() => {
                                        setReplyTo({
                                          id: comment.id,
                                          name: reply.authorName,
                                        });
                                        document
                                          .querySelector("input")
                                          ?.focus();
                                      }}
                                      className="hover:underline hover:text-purple-600 transition-colors"
                                    >
                                      Reply
                                    </button>
                                    <span className="font-normal opacity-70">
                                      {formatTimeAgo(reply.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Comment Input - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-100 dark:border-gray-700 p-4 z-40">
          <div className="max-w-2xl mx-auto">
            {replyTo && (
              <div className="flex items-center justify-between px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-t-xl border-x border-t border-purple-100 dark:border-purple-800 text-xs">
                <span className="text-purple-700 dark:text-purple-300">
                  Replying to <span className="font-bold">{replyTo.name}</span>
                </span>
                <button
                  onClick={() => setReplyTo(null)}
                  className="text-purple-500 hover:text-purple-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            <form
              onSubmit={handleComment}
              className={`flex items-start gap-3 bg-white dark:bg-gray-800 p-3 ${replyTo ? "rounded-b-2xl border-x border-b border-gray-100 dark:border-gray-700 shadow-lg" : "rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md"}`}
            >
              <div className="flex-shrink-0 mt-1">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-100 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                    {currentUser ? getInitials(currentUser.name) : "?"}
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="relative">
                  <textarea
                    rows={1}
                    value={newComment}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    placeholder={
                      replyTo
                        ? `Reply to ${replyTo.name}...`
                        : "Write a comment..."
                    }
                    className="w-full pl-4 pr-12 py-2.5 rounded-2xl bg-gray-100 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-purple-500 text-sm resize-none scrollbar-hide min-h-[42px] max-h-[120px]"
                    style={{ overflow: "hidden" }}
                  />
                  <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
                    <button
                      type="button"
                      className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Smile className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ImageIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600 text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-all shadow-sm active:scale-95"
                  >
                    <span>Post</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
