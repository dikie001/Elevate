import React, { useState, useCallback, useRef } from "react";
import {
  Upload,
  X,
  Image,
  Check,
  AlertCircle,
  Download,
  Eye,
} from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: "uploading" | "success" | "error";
  progress: number;
}

const ImageUploadPage: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert("Please upload only image files (JPEG, PNG, GIF, WebP)");
      return false;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 10MB");
      return false;
    }

    return true;
  };

  const processFiles = useCallback((fileList: FileList) => {
    const validFiles = Array.from(fileList).filter(validateFile);

    validFiles.forEach((file) => {
      const id = generateId();
      const preview = URL.createObjectURL(file);

      const newFile: UploadedFile = {
        id,
        file,
        preview,
        status: "uploading",
        progress: 0,
      };

      setFiles((prev) => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.id === id) {
              const newProgress = Math.min(
                f.progress + Math.random() * 25,
                100
              );
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? "success" : "uploading",
              };
            }
            return f;
          })
        );
      }, 300);

      // Clear interval when upload completes
      setTimeout(() => clearInterval(interval), 2000);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      if (e.dataTransfer.files) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  const downloadFile = (file: UploadedFile) => {
    const url = URL.createObjectURL(file.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Image Upload Studio
          </h1>
          <p className="text-xl text-slate-300">
            Drop your images and watch the magic happen ✨
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleFileSelect}
          className={`
            relative mb-8 p-12 border-2 border-dashed rounded-3xl cursor-pointer
            transition-all duration-300 ease-in-out transform hover:scale-[1.02]
            backdrop-blur-sm bg-white/5
            ${
              isDragOver
                ? "border-cyan-400 bg-cyan-400/10 scale-[1.02]"
                : "border-slate-600 hover:border-cyan-400 hover:bg-white/10"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="text-center">
            <div
              className={`mx-auto mb-6 p-4 rounded-full w-24 h-24 flex items-center justify-center transition-colors duration-300 ${
                isDragOver ? "bg-cyan-400/20" : "bg-slate-700/50"
              }`}
            >
              <Upload
                className={`w-12 h-12 transition-colors duration-300 ${
                  isDragOver ? "text-cyan-400" : "text-slate-400"
                }`}
              />
            </div>

            <h3 className="text-2xl font-semibold text-white mb-2">
              {isDragOver ? "Drop your images here!" : "Choose or drag images"}
            </h3>

            <p className="text-slate-400 mb-6">
              Support for JPEG, PNG, GIF, WebP • Max 10MB per file
            </p>

            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              Browse Files
            </button>
          </div>
        </div>

        {/* Upload Queue */}
        {files.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Image className="w-6 h-6 text-cyan-400" />
                Uploaded Files ({files.length})
              </h2>
              <button
                onClick={clearAll}
                className="px-4 py-2 text-sm bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="group relative bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  {/* Image Preview */}
                  <div className="relative mb-4 rounded-xl overflow-hidden bg-slate-700/50">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-48 object-cover"
                    />

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                      <button
                        onClick={() => window.open(file.preview, "_blank")}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => downloadFile(file)}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Download className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 backdrop-blur-sm rounded-full hover:bg-red-600/80 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* File Info */}
                  <div className="space-y-3">
                    <div>
                      <h3
                        className="font-semibold text-white truncate"
                        title={file.file.name}
                      >
                        {file.file.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {formatFileSize(file.file.size)}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">
                          {file.status === "uploading" && "Uploading..."}
                          {file.status === "success" && "Upload Complete"}
                          {file.status === "error" && "Upload Failed"}
                        </span>
                        <div className="flex items-center gap-1">
                          {file.status === "uploading" && (
                            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                          )}
                          {file.status === "success" && (
                            <Check className="w-4 h-4 text-green-400" />
                          )}
                          {file.status === "error" && (
                            <AlertCircle className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-sm text-slate-400">
                            {Math.round(file.progress)}%
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ease-out ${
                            file.status === "success"
                              ? "bg-gradient-to-r from-green-400 to-emerald-500"
                              : file.status === "error"
                              ? "bg-gradient-to-r from-red-400 to-red-500"
                              : "bg-gradient-to-r from-cyan-400 to-purple-500"
                          }`}
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Card */}
        {files.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Upload className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {files.length}
                  </p>
                  <p className="text-slate-400">Total Files</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {files.filter((f) => f.status === "success").length}
                  </p>
                  <p className="text-slate-400">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Image className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {formatFileSize(
                      files.reduce((total, file) => total + file.file.size, 0)
                    )}
                  </p>
                  <p className="text-slate-400">Total Size</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {files.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto mb-6 p-6 bg-slate-800/30 backdrop-blur-sm rounded-full w-32 h-32 flex items-center justify-center">
              <Image className="w-16 h-16 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No images uploaded yet
            </h3>
            <p className="text-slate-500">
              Start by uploading some images to see them here
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-slate-700/50">
          <p className="text-slate-400 mb-2">Secure • Fast • Reliable</p>
          <p className="text-sm text-slate-500">
            Built with React, TypeScript & Tailwind CSS by Mr Dickens
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ImageUploadPage;
