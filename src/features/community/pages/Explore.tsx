import { Search, TrendingUp, Users, Target, Hash } from "lucide-react";
import CommunityLayout from "../components/CommunityLayout";

const TRENDING = [
  {
    tag: "#ScienceFair2026",
    posts: "2.4k posts",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    tag: "#MathOlympiad",
    posts: "1.8k posts",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    tag: "#StudyHacks",
    posts: "5.6k posts",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    tag: "#BrilliaNetwork",
    posts: "12k posts",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

const SUGGESTED_PEOPLE = [
  {
    name: "Dr. Sarah Chen",
    role: "Physics Mentor",
    avatar: "SC",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    name: "Marcus Johnson",
    role: "Top Student",
    avatar: "MJ",
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
  {
    name: "Elena Rodriguez",
    role: "Study Consultant",
    avatar: "ER",
    color:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
];

export default function Explore() {
  return (
    <CommunityLayout>
      <div className="min-h-screen bg-muted/30 dark:bg-zinc-950/20 transition-colors duration-500 pb-20 lg:pb-10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-black mb-2">Explore</h1>
            <p className="text-muted-foreground">
              Discover what's happening in the Brillia community
            </p>
          </header>

          {/* Search Bar */}
          <div className="relative group mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Search topics, people, or communities..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Trending */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Trending Topics</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TRENDING.map((topic) => (
                    <button
                      key={topic.tag}
                      className={`p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all text-left group overflow-hidden relative`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                      />
                      <div className="relative z-10">
                        <Hash className="w-4 h-4 text-primary mb-2" />
                        <h3 className="font-bold text-lg mb-1">{topic.tag}</h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.posts}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Featured Communities</h2>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-32 h-32 text-primary" />
                  </div>
                  <div className="relative z-10 max-w-md">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                      Spotlight
                    </span>
                    <h3 className="text-2xl font-black mt-4 mb-2">
                      Advanced Mathematics Group
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Join over 2,000 students discussing complex calculus and
                      algebraic structures.
                    </p>
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity">
                      Join Community
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Suggested */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Who to Follow</h2>
                </div>
                <div className="bg-card border border-border rounded-2xl divide-y divide-border">
                  {SUGGESTED_PEOPLE.map((person) => (
                    <div
                      key={person.name}
                      className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm ${person.color} group-hover:scale-105 transition-transform`}
                      >
                        {person.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate">{person.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {person.role}
                        </p>
                      </div>
                      <button className="text-xs font-bold text-primary hover:underline">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                  Show more
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
