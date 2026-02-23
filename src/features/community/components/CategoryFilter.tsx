import type { LucideIcon } from "lucide-react";


interface Category {
    id: string;
    label: string;
    icon: LucideIcon;
}

interface CategoryFilterProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${isActive
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600"
                            }`}
                    >
                        <Icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
                        {cat.label}
                    </button>
                );
            })}
        </div>
    );
}
