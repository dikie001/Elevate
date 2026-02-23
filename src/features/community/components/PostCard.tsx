import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import type { Post, User } from "../types";
import { formatTimeAgo } from "../utils";

interface PostCardProps {
    post: Post;
    currentUser: User | null;
    onLike: (postId: string) => void;
    onBookmark?: (postId: string) => void;
}

export default function PostCard({ post, currentUser, onLike, onBookmark }: PostCardProps) {
    const isLiked = currentUser && post.likes.includes(currentUser.id);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <article className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800/50 overflow-hidden hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
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
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/10 group-hover:ring-purple-500/30 transition-all"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shadow-inner">
                            {getInitials(post.authorName)}
                        </div>
                    )}
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {post.authorName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            {post.authorGrade && <span>{post.authorGrade}</span>}
                            <span>·</span>
                            <span>{formatTimeAgo(post.createdAt)}</span>
                        </div>
                    </div>
                </Link>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </button>
            </div>

            {/* Post Content */}
            <Link to={`/community/post/${post.id}`} className="block px-4 pb-3">
                <p className="text-gray-800 dark:text-gray-200 text-[15px] leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                    {post.isQuestion && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-medium border border-amber-100 dark:border-amber-900/30">
                            <MessageCircle className="h-3 w-3" />
                            Question
                        </span>
                    )}
                    {post.subject && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium border border-blue-100 dark:border-blue-900/30">
                            {post.subject}
                        </span>
                    )}
                </div>
            </Link>

            {/* Post Image */}
            {post.image && (
                <Link to={`/community/post/${post.id}`} className="block mt-1">
                    <img
                        src={post.image}
                        alt="Post attachment"
                        className="w-full max-h-[450px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                </Link>
            )}

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between bg-gray-50/30 dark:bg-gray-900/20">
                <div className="flex items-center gap-4 sm:gap-6">
                    <button
                        onClick={() => onLike(post.id)}
                        className={`flex items-center gap-1.5 transition-all duration-300 ${isLiked
                                ? "text-red-500 scale-110"
                                : "text-gray-500 dark:text-gray-400 hover:text-red-500 hover:scale-105"
                            }`}
                    >
                        <Heart
                            className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`}
                        />
                        <span className="text-sm font-medium">{post.likes.length}</span>
                    </button>
                    <Link
                        to={`/community/post/${post.id}`}
                        className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-purple-500 hover:scale-105 transition-all duration-300"
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">{post.comments.length}</span>
                    </Link>
                    <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:scale-105 transition-all duration-300">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
                <button
                    onClick={() => onBookmark?.(post.id)}
                    className="text-gray-500 dark:text-gray-400 hover:text-purple-500 hover:scale-110 transition-all duration-300"
                >
                    <Bookmark className="h-5 w-5" />
                </button>
            </div>
        </article>
    );
}
