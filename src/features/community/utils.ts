import type { Post, User, Conversation, Message, Comment } from "./types";

const POSTS_KEY = "community_posts";
const USERS_KEY = "community_users";
const CONVERSATIONS_KEY = "community_conversations";
const CURRENT_USER_KEY = "user-info";

// Get current user
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(CURRENT_USER_KEY);
  if (!userData) return null;
  const parsed = JSON.parse(userData);
  return {
    id: parsed.id || `user_${Date.now()}`,
    name: parsed.name || "Anonymous",
    avatar: parsed.avatar,
    grade: parsed.grade,
    bio: parsed.bio || "",
    joinedAt: parsed.joinedAt || new Date().toISOString(),
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
  };
};

// Posts CRUD
export const getPosts = (): Post[] => {
  const posts = localStorage.getItem(POSTS_KEY);
  return posts ? JSON.parse(posts) : [];
};

export const getPostById = (id: string): Post | undefined => {
  return getPosts().find((p) => p.id === id);
};

export const createPost = (
  post: Omit<Post, "id" | "createdAt" | "likes" | "comments">,
): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: `post_${Date.now()}`,
    createdAt: new Date().toISOString(),
    likes: [],
    comments: [],
  };
  posts.unshift(newPost);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  return newPost;
};

export const likePost = (postId: string, userId: string): void => {
  const posts = getPosts();
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex !== -1) {
    const post = posts[postIndex];
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      post.likes.push(userId);
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }
};

export const addComment = (
  postId: string,
  comment: Omit<Comment, "id" | "createdAt" | "likes">,
): void => {
  const posts = getPosts();
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex !== -1) {
    posts[postIndex].comments.push({
      ...comment,
      id: `comment_${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: [],
    });
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }
};

export const deletePost = (postId: string): void => {
  const posts = getPosts().filter((p) => p.id !== postId);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

// Users
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getUserById = (id: string): User | undefined => {
  return getUsers().find((u) => u.id === id);
};

// Messages & Conversations
export const getConversations = (): Conversation[] => {
  const convos = localStorage.getItem(CONVERSATIONS_KEY);
  return convos ? JSON.parse(convos) : [];
};

export const getConversationById = (id: string): Conversation | undefined => {
  return getConversations().find((c) => c.id === id);
};

export const sendMessage = (
  conversationId: string,
  message: Omit<Message, "id" | "createdAt" | "read">,
): void => {
  const conversations = getConversations();
  const convoIndex = conversations.findIndex((c) => c.id === conversationId);
  if (convoIndex !== -1) {
    const newMessage: Message = {
      ...message,
      id: `msg_${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    conversations[convoIndex].lastMessage = newMessage;
    conversations[convoIndex].updatedAt = new Date().toISOString();
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  }
};

// Time formatting
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
};

// Initialize with sample data if empty
export const initializeSampleData = (): void => {
  const posts = getPosts();
  if (posts.length === 0) {
    const samplePosts: Post[] = [
      {
        id: "post_1",
        authorId: "user_sample_1",
        authorName: "Sarah Kimani",
        authorGrade: "Grade 8",
        content:
          "Can someone help me understand quadratic equations? I'm struggling with the factorization method. 📚",
        likes: ["user_2", "user_3"],
        comments: [
          {
            id: "comment_1",
            authorId: "user_sample_2",
            authorName: "James Odhiambo",
            content:
              "I can help! The key is to find two numbers that multiply to give 'c' and add up to 'b'. DM me if you need more help!",
            likes: ["user_1"],
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
        ],
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        isQuestion: true,
        subject: "Mathematics",
      },
      {
        id: "post_2",
        authorId: "user_sample_2",
        authorName: "James Odhiambo",
        authorGrade: "Grade 7",
        content:
          "Just scored 95% on my Science quiz! 🎉 Hard work pays off. Keep pushing everyone!",
        likes: ["user_1", "user_3", "user_4", "user_5"],
        comments: [],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isQuestion: false,
      },
      {
        id: "post_3",
        authorId: "user_sample_3",
        authorName: "Grace Wanjiku",
        authorGrade: "Grade 8",
        content:
          "Study tip: Use mnemonics for remembering lists! For example, 'My Very Educated Mother Just Served Us Nachos' for planets 🌍🪐",
        likes: ["user_1", "user_2"],
        comments: [
          {
            id: "comment_2",
            authorId: "user_sample_1",
            authorName: "Sarah Kimani",
            content: "This is so helpful! Do you have any for History?",
            likes: [],
            createdAt: new Date(Date.now() - 43200000).toISOString(),
          },
        ],
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        isQuestion: false,
        subject: "Science",
      },
    ];
    localStorage.setItem(POSTS_KEY, JSON.stringify(samplePosts));
  }
};
