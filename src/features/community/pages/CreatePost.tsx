import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image, X, HelpCircle, BookOpen } from "lucide-react";
import Sidebar from "@/components/app/Sidebar";
import { createPost, getCurrentUser } from "../utils";
import { toast } from "sonner";

const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Kiswahili",
  "CRE",
  "History",
  "Geography",
];

export default function CreatePost() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isQuestion, setIsQuestion] = useState(false);
  const [subject, setSubject] = useState<string | undefined>();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = getCurrentUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !currentUser) return;

    setIsSubmitting(true);

    try {
      createPost({
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        authorGrade: currentUser.grade,
        content: content.trim(),
        isQuestion,
        subject: subject || undefined,
        images,
      });

      toast.success(isQuestion ? "Question posted!" : "Post shared!");
      navigate("/community");
    } catch (err) {
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create Post
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-6">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                {currentUser ? getInitials(currentUser.name) : "?"}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {currentUser?.name || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentUser?.grade || "Student"}
              </p>
            </div>
          </div>

          {/* Post Type Toggle */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setIsQuestion(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                !isQuestion
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span className="font-medium text-sm">Share Post</span>
            </button>
            <button
              onClick={() => setIsQuestion(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                isQuestion
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span className="font-medium text-sm">Ask Question</span>
            </button>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                isQuestion
                  ? "What would you like to ask the community?"
                  : "What's on your mind? Share tips, celebrate wins, or start a discussion..."
              }
              className="w-full min-h-[200px] p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder:text-gray-400"
              autoFocus
            />
          </div>

          {/* Subject Selection (for questions) */}
          {isQuestion && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select a subject (optional)
              </p>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((sub) => (
                  <button
                    key={sub}
                    onClick={() =>
                      setSubject(subject === sub ? undefined : sub)
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      subject === sub
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Images Preview */}
          {images.length > 0 && (
            <div className="mb-6 grid grid-cols-2 gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative group aspect-square">
                  <img
                    src={img}
                    alt={`Upload ${idx + 1}`}
                    className="w-full h-full object-cover rounded-2xl border border-border"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Attachment Options */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add to your post
            </span>
            <div className="flex-1" />
            <label className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Image className="h-5 w-5 text-green-500" />
            </label>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
            <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
              {isQuestion
                ? "Tips for asking questions:"
                : "Community guidelines:"}
            </h4>
            <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
              {isQuestion ? (
                <>
                  <li>• Be specific about what you need help with</li>
                  <li>• Include relevant details like topic or chapter</li>
                  <li>• Select the subject for better visibility</li>
                </>
              ) : (
                <>
                  <li>• Be respectful and supportive</li>
                  <li>• Share study tips and helpful resources</li>
                  <li>• Celebrate achievements - yours and others!</li>
                </>
              )}
            </ul>
          </div>
        </main>
      </div>
    </Sidebar>
  );
}
