import { Link } from "react-router-dom";
import { MessageCircle, Share2, MoreHorizontal, ThumbsUp } from "lucide-react";
import type { Post, User } from "../types";
import { formatTimeAgo } from "../utils";
import ReactionButton, { REACTIONS } from "./ReactionButton";
import ImageGrid from "./ImageGrid";

interface PostCardProps {
  post: Post;
  currentUser: User | null;
  onReact: (postId: string, type: string) => void;
}

export default function PostCard({
  post,
  currentUser,
  onReact,
}: PostCardProps) {
  const isLiked = !!(currentUser && post.likes.includes(currentUser.id));
  const userReaction =
    currentUser && post.reactions
      ? Object.keys(post.reactions).find((type) =>
          post.reactions![type].includes(currentUser.id),
        )
      : undefined;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get top 3 reactions to show icons
  const reactionStats = post.reactions
    ? Object.entries(post.reactions)
        .map(([type, users]) => ({ type, count: users.length }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
    : [];

  const totalReactions =
    (post.likes.length || 0) +
    (post.reactions
      ? Object.values(post.reactions).reduce(
          (acc, users) => acc + users.length,
          0,
        )
      : 0);

  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border shadow-sm overflow-hidden transition-all duration-300">
      {/* Post Header */}
      <div className="p-3 pb-2 flex items-start justify-between">
        <Link
          to={`/community/profile/${post.authorId}`}
          className="flex items-center gap-2 group"
        >
          {post.authorAvatar ? (
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
              {getInitials(post.authorName)}
            </div>
          )}
          <div>
            <p className="font-semibold text-sm hover:underline">
              {post.authorName}
            </p>
            <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
              {post.authorGrade && <span>{post.authorGrade}</span>}
              <span>·</span>
              <span>{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
        </Link>
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-3 py-2">
        <Link to={`/community/post/${post.id}`} className="block">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </Link>

        <div className="flex flex-wrap gap-2 mt-2">
          {post.isQuestion && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-foreground rounded text-[11px] font-medium border border-border">
              <MessageCircle className="h-3 w-3" />
              Question
            </span>
          )}
          {post.subject && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground rounded text-[11px] font-medium border border-border lowercase italic">
              #{post.subject}
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
      <div className="px-3 py-2 flex items-center justify-between border-b border-border text-[13px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="flex items-center -space-x-1">
            {post.likes.length > 0 && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-card z-10">
                <ThumbsUp className="h-2 w-2 text-white fill-white" />
              </div>
            )}
            {reactionStats.map((stat, i) => {
              const reactionInfo = REACTIONS.find((r) => r.type === stat.type);
              return (
                <div
                  key={stat.type}
                  className="w-4 h-4 rounded-full flex items-center justify-center border border-card z-0 text-[10px]"
                  style={{ zIndex: 5 - i }}
                >
                  {reactionInfo?.emoji}
                </div>
              );
            })}
          </div>
          <span className="ml-1">{totalReactions}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{post.comments.length} comments</span>
          <span>{Math.floor(Math.random() * 10)} shares</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-1 py-1 flex items-center justify-between">
        <ReactionButton
          currentReaction={userReaction}
          isLiked={isLiked}
          onReact={(type) => onReact(post.id, type)}
        />
        <Link
          to={`/community/post/${post.id}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-semibold">Comment</span>
        </Link>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <Share2 className="h-5 w-5" />
          <span className="text-sm font-semibold">Share</span>
        </button>
      </div>
    </div>
  );
}
