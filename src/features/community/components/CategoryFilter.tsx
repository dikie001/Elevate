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

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-background border border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
