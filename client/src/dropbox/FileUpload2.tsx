import { Loader, LucideLoaderCircle } from "lucide-react";
import React, { useState } from "react";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const isOnline = navigator.onLine;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setStatus("idle");
    setMessage("");
  };

  const handleUpload = async () => {
    if (!isOnline) {
      setMessage("Ensure you have an internet connection");
      return;
    }
    if (!selectedFile) {
      setStatus("error");
      setMessage("Please select a file first");
      return;
    }

    setStatus("uploading");
    setMessage("Preparing upload...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setMessage("Please wait a sec...");
      const response = await fetch("http://localhost:4000/api/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log(data)
      setStatus("success");
      setMessage(` ${data.message}`);
    } catch (err) {
      setStatus("error");
      setMessage("Upload failed. Please try again.");
      console.error("Upload error:", err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-emerald-400";
      case "error":
        return "text-red-400";
      case "uploading":
        return "text-blue-400";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">
            File Upload
          </h2>
          <p className="text-zinc-400 text-sm">
            Select a file to upload to the server
          </p>
        </div>

        {/* File Drop Zone */}
        <label className="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-zinc-700 rounded-xl p-8 cursor-pointer hover:border-zinc-500 hover:bg-zinc-800/50 transition-colors">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={status === "uploading"}
          />

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 text-zinc-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-white font-medium">{selectedFile.name}</p>
                <p className="text-zinc-500 text-sm">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-zinc-300">Click to select a file</p>
                <p className="text-zinc-500 text-sm">or drag and drop</p>
              </div>
            )}
          </div>
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || status === "uploading"}
          className="w-full py-3 px-4 rounded-xl flex flex-row items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white"
        >
          {status === "uploading" ? <div className="flex gap-2"><p>Uploading...</p> <LucideLoaderCircle className="animate-spin" size={20}/> </div> : "Upload File"}
        </button>

        {/* Status Message */}
        {message && (
          <div className={`text-center text-sm ${getStatusColor()}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
