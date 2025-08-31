// src/FileUpload.js
import React, { useState } from "react";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0]);
    console.log(e.target.files)
    setStatus(""); // Reset status on new file selection
    // const newFile = e.target.files?.[0]
    // const formData = new FormData()
    // formData.append('file', newFile)
    // console.log([...formData.entries()])
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatus("Please select a file first.");
      return;
    }
    

    setStatus("Uploading...");
    // FormData is used to package the file for the HTTP request
    const formData = new FormData();
    formData.append("file", selectedFile); // The key 'file' must match the backend's upload.single('file')
    try {
      const response = await fetch("http://localhost:4000/api/image", {
        // Your backend URL
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setStatus(`Success! File uploaded: ${data.data.name}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("Upload failed. See console for details.");
    }
  };

  return (
    <div>
      <h2>Upload a File to Dropbox</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default FileUpload;
