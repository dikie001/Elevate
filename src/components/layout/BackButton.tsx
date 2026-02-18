import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export default function BackButton({ label, className = "" }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 p-2 -ml-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5" />
      {label && <span className="font-medium">{label}</span>}
    </button>
  );
}
