import React, { useState } from "react";
import axios from "axios";

const UploadMedia = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      setMessage("Title and file are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post("http://localhost:3000/api/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Media uploaded successfully!");
      setFile(null);
      setTitle("");
      setDescription("");
      setPreview(null);
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Media</h2>

      {/* Title Input */}
      <input
        type="text"
        required
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mb-4"
      />

      {/* Description Input */}
      <textarea
        placeholder="Enter description..."
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mb-4"
      ></textarea>

      {/* File Upload Input */}
      <div className="border-dashed border-2 border-gray-400 p-6 rounded-md flex flex-col items-center">
        <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Choose File
        </label>
        {file && <p className="mt-2 text-gray-700">{file.name}</p>}
      </div>

      {/* Preview Section */}
      {preview && (
        <div className="mt-4">
          {file.type.startsWith("video") ? (
            <video className="w-full rounded-md" controls>
              <source src={preview} type={file.type} />
            </video>
          ) : (
            <audio className="w-full mt-2" controls>
              <source src={preview} type={file.type} />
            </audio>
          )}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Message Display */}
      {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default UploadMedia;
