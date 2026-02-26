import {
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";
import CommunityLayout from "../components/CommunityLayout";

const CLASSES = [
  {
    id: 1,
    name: "Advanced Physics",
    code: "PHY-402",
    students: 24,
    time: "Mon, Wed • 10:00 AM",
    color: "from-blue-600 to-indigo-600",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Organic Chemistry",
    code: "CHE-301",
    students: 18,
    time: "Tue, Thu • 1:30 PM",
    color: "from-emerald-600 to-teal-600",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "Calculus III",
    code: "MAT-303",
    students: 32,
    time: "Fri • 9:00 AM",
    color: "from-purple-600 to-pink-600",
    icon: <Target className="w-6 h-6" />,
  },
];

import { Target } from "lucide-react";

export default function Classes() {
  return (
    <CommunityLayout>
      <div className="min-h-screen bg-muted/30 dark:bg-zinc-950/20 transition-colors duration-500 pb-20 lg:pb-10">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black mb-2">My Classes</h1>
              <p className="text-muted-foreground">
                Manage your active classes and study groups
              </p>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              <GraduationCap className="w-5 h-5" />
              Find New Class
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLASSES.map((cls) => (
              <div
                key={cls.id}
                className="group relative bg-card border border-border rounded-3xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${cls.color}`}
                />

                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${cls.color} text-white shadow-xl group-hover:scale-110 transition-transform duration-500`}
                  >
                    {cls.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {cls.code}
                  </span>
                </div>

                <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">
                  {cls.name}
                </h3>
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{cls.students} Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Active</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex items-center justify-between group-hover:translate-x-1 transition-transform">
                  <span className="text-xs font-bold text-muted-foreground italic">
                    {cls.time}
                  </span>
                  <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}

            {/* Add New Class Placeholder */}
            <button className="group border-2 border-dashed border-border rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-bold">Join another class</span>
            </button>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
