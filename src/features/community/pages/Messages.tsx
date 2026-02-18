import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Edit,
  MoreHorizontal,
  Check,
  CheckCheck,
} from "lucide-react";
import Sidebar from "../../../components/app/Sidebar";
import { getCurrentUser, formatTimeAgo } from "../utils";
import type { Conversation } from "../types";

// Sample conversations for demo
const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_1",
    participantIds: ["user_sample_1"],
    participants: [
      {
        id: "user_sample_1",
        name: "Sarah Kimani",
        grade: "Grade 8",
        bio: "",
        joinedAt: new Date().toISOString(),
        followersCount: 50,
        followingCount: 30,
        postsCount: 12,
      },
    ],
    lastMessage: {
      id: "msg_1",
      conversationId: "conv_1",
      senderId: "user_sample_1",
      content: "Thanks for the help with math! Really appreciate it 🙏",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      read: false,
    },
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    unreadCount: 2,
  },
  {
    id: "conv_2",
    participantIds: ["user_sample_2"],
    participants: [
      {
        id: "user_sample_2",
        name: "James Odhiambo",
        grade: "Grade 7",
        bio: "",
        joinedAt: new Date().toISOString(),
        followersCount: 75,
        followingCount: 45,
        postsCount: 8,
      },
    ],
    lastMessage: {
      id: "msg_2",
      conversationId: "conv_2",
      senderId: "current_user",
      content: "No problem! Let me know if you need more help",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    unreadCount: 0,
  },
  {
    id: "conv_3",
    participantIds: ["user_sample_3"],
    participants: [
      {
        id: "user_sample_3",
        name: "Grace Wanjiku",
        grade: "Grade 8",
        bio: "",
        joinedAt: new Date().toISOString(),
        followersCount: 120,
        followingCount: 65,
        postsCount: 24,
      },
    ],
    lastMessage: {
      id: "msg_3",
      conversationId: "conv_3",
      senderId: "user_sample_3",
      content: "Check out this cool study technique I found!",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      read: true,
    },
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    unreadCount: 0,
  },
];

export default function Messages() {
  const navigate = useNavigate();
  const [conversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = getCurrentUser();

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;
    const participant = conv.participants[0];
    return participant.name.toLowerCase().includes(searchQuery.toLowerCase());
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
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Messages
                </h1>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Edit className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto">
          {/* Conversations List */}
          {filteredConversations.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No messages yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Start a conversation with someone from the community!
              </p>
              <button
                onClick={() => navigate("/community")}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Explore Community
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredConversations.map((conversation) => {
                const participant = conversation.participants[0];
                const isOwnMessage =
                  conversation.lastMessage?.senderId === currentUser?.id ||
                  conversation.lastMessage?.senderId === "current_user";

                return (
                  <button
                    key={conversation.id}
                    onClick={() => {
                      // In a real app, navigate to conversation detail
                      // For now, just show a toast or stay on the page
                    }}
                    className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      {participant.avatar ? (
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {getInitials(participant.name)}
                        </div>
                      )}
                      {/* Online indicator (demo) */}
                      {conversation.id === "conv_1" && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className={`font-semibold truncate ${
                            conversation.unreadCount > 0
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {participant.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                          {formatTimeAgo(conversation.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isOwnMessage && (
                          <span className="flex-shrink-0">
                            {conversation.lastMessage?.read ? (
                              <CheckCheck className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Check className="h-4 w-4 text-gray-400" />
                            )}
                          </span>
                        )}
                        <p
                          className={`text-sm truncate ${
                            conversation.unreadCount > 0
                              ? "text-gray-900 dark:text-white font-medium"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {conversation.lastMessage?.content}
                        </p>
                      </div>
                    </div>

                    {/* Unread Badge */}
                    {conversation.unreadCount > 0 && (
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Requests Section (if needed) */}
          {filteredConversations.length > 0 && (
            <div className="px-4 py-6 border-t border-gray-100 dark:border-gray-800">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      Message Requests
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Requests from people you don't follow
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                  0
                </span>
              </button>
            </div>
          )}
        </main>
      </div>
    </Sidebar>
  );
}
