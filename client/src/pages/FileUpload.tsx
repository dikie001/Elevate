import { LucideLoaderCircle, UploadCloud } from "lucide-react";
import React, { useState } from "react";
import DesktopSidebar from "../components/DesktopSidebar";

interface FileDataTypes {
  subject: string;
  grade: string;
}
const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<FileDataTypes>({
    subject: "",
    grade: "",
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setFileData((prev) => ({ ...prev, [name]: value }));
    console.log(fileData)
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
    formData.append("data", JSON.stringify(fileData));

    try {
      setMessage("Please wait a sec...");
      const response = await fetch("http://localhost:4000/api/file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log(data);
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
    <div className="flex items-center justify-center min-h-screen px-4 lg:ml-70">
      <DesktopSidebar />
      <div className="w-full max-w-md bg-neutral-200 rounded-2xl border border-neutral-400 p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
            File Upload
          </h2>
          <div>
            <label
              htmlFor="grade"
              className="block mb-2 text-sm font-medium text-neutral-700"
            >
              Select Grade
            </label>
            <select
              id="grade"
              name="grade"
              onChange={handleInputChange}
              className="w-full  px-4 py-3 rounded-xl border border-neutral-400 bg-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>

          <label htmlFor="subject-input" className="mb-2 text-neutral-600">
            Enter subject
          </label>
          <input
            type="text"
            id="subject-input"
            name="subject"
            value={fileData.subject}
            onChange={handleInputChange}
            placeholder="Subject i.e English"
            className="bg-neutral-300 w-full px-4 py-3 text-neutral-800 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <p className="text-neutral-600 text-sm">
            Select a file to upload to the server
          </p>
        </div>

        {/* File Drop Zone */}
        <label className="relative flex bg-neutral-300 flex-col items-center justify-center w-full border-2 border-dashed  rounded-xl p-8 cursor-pointer  hover:bg-neutral-400/50 transition-colors">
          <input
            type="file"
            name="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={status === "uploading"}
          />

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 text-blue-600">
              <UploadCloud className="" size={50} />
            </div>

            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-blue-800 font-medium">{selectedFile.name}</p>
                <p className="text-zinc-500 text-sm">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-neutral-500">Click to select a file</p>
                <p className="text-neutral-600 text-sm">or drag and drop</p>
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
          {status === "uploading" ? (
            <div className="flex gap-2">
              <p>Uploading...</p>{" "}
              <LucideLoaderCircle className="animate-spin" size={20} />{" "}
            </div>
          ) : (
            "Upload File"
          )}
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
