import { Users, ExternalLink } from "lucide-react";

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
    <aside className="w-[300px] hidden xl:block space-y-4 sticky top-6 self-start">
      {/* Trending Section */}
      <div className="bg-card text-card-foreground rounded-lg border border-border p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base">Trending for you</h3>
        </div>
        <div className="space-y-4">
          {trendingTopics.map((topic) => (
            <div key={topic.name} className="group cursor-pointer">
              <p className="text-[12px] text-muted-foreground">
                {topic.category} · Trending
              </p>
              <p className="font-bold text-[14px] group-hover:underline">
                #{topic.name}
              </p>
              <p className="text-[12px] text-muted-foreground">
                {topic.posts} posts
              </p>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm font-semibold text-primary hover:bg-accent rounded-md transition-all text-left px-2">
          Show more
        </button>
      </div>

      {/* Suggested Communities */}
      <div className="bg-card text-card-foreground rounded-lg border border-border p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-bold text-base">Suggested Groups</h3>
        </div>
        <div className="space-y-4">
          {suggestedCommunities.map((community) => (
            <div
              key={community.name}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-xl">
                {community.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[14px] truncate group-hover:underline">
                  {community.name}
                </p>
                <p className="text-[12px] text-muted-foreground">
                  {community.members} members
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm font-semibold text-primary hover:bg-accent rounded-md transition-all text-left px-2">
          See all
        </button>
      </div>

      {/* Footer Info */}
      <div className="px-2 text-[12px] text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
        <a href="#" className="hover:underline">
          Privacy
        </a>
        <a href="#" className="hover:underline">
          Terms
        </a>
        <a href="#" className="hover:underline">
          Ad Choices
        </a>
        <a href="#" className="hover:underline">
          Cookies
        </a>
        <span>© 2024 Brillia</span>
      </div>
    </aside>
  );
}
