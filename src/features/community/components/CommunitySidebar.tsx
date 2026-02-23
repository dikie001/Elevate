import { TrendingUp, Users, Search, ExternalLink } from "lucide-react";

export default function CommunitySidebar() {
    const trendingTopics = [
        { name: "Mathematics", posts: "1.2k", category: "Academic" },
        { name: "StudyTips", posts: "850", category: "productivity" },
        { name: "ScienceFair2024", posts: "420", category: "Event" },
        { name: "Exams", posts: "2.1k", category: "Support" },
    ];

    const suggestedCommunities = [
        { name: "Grade 8 Study Group", members: "150", icon: "📚" },
        { name: "Science Enthusiasts", members: "89", icon: "🔬" },
        { name: "Art & Creativity", members: "230", icon: "🎨" },
    ];

    return (
        <aside className="w-80 hidden xl:block space-y-6 sticky top-24 self-start">
            {/* Search Input for Sidebar */}
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 dark:border-gray-800/50">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search community..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700/50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                </div>
            </div>

            {/* Trending Section */}
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-3xl border border-gray-100 dark:border-gray-800/50">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Trending Topics</h3>
                </div>
                <div className="space-y-4">
                    {trendingTopics.map((topic) => (
                        <div key={topic.name} className="group cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                        {topic.category} · Trending
                                    </p>
                                    <p className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 transition-colors">
                                        #{topic.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">{topic.posts} posts</p>
                                </div>
                                <ExternalLink className="h-4 w-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm font-semibold text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all">
                    Show more
                </button>
            </div>

            {/* Suggested Communities */}
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-3xl border border-gray-100 dark:border-gray-800/50">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Suggested Communities</h3>
                </div>
                <div className="space-y-4">
                    {suggestedCommunities.map((community) => (
                        <div key={community.name} className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                {community.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                                    {community.name}
                                </p>
                                <p className="text-xs text-gray-500">{community.members} members</p>
                            </div>
                            <button className="px-3 py-1 text-xs font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-80 transition-opacity">
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <div className="px-5 text-xs text-gray-400 space-x-3">
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Cookies</a>
                <span>© 2024 Brillia Community</span>
            </div>
        </aside>
    );
}
