export interface User {
  id: string;
  name: string;
  avatar?: string;
  grade?: string;
  bio?: string;
  joinedAt: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorGrade?: string;
  content: string;
  image?: string;
  images?: string[];
  subject?: string;
  likes: string[];
  reactions?: Record<string, string[]>;
  comments: Comment[];
  createdAt: string;
  isQuestion?: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: string[];
  reactions?: Record<string, string[]>;
  createdAt: string;
  replies?: Comment[];
}

export interface Message {
  id: string;
  conversationId?: string;
  senderId: string;
  receiverId?: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}
