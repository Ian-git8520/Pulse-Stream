import React, { useState } from "react";
import UploadWidget from "./UploadWidget";

export default function PostForm({ addPost, apiUrl = process.env.REACT_APP_API_URL, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleUpload = (url, type) => {
    setMediaUrl(url);
    setMediaType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please provide a title");
    if (!mediaUrl) return alert("Please upload media");

    const payload = {
      user,
      title,
      description,
      mediaUrl,
      mediaType,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    try {
      setSubmitting(true);
      const res = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      addPost(data);
      setTitle("");
      setDescription("");
      setMediaUrl("");
      setMediaType("");
      alert("Posted!");
    } catch (err) {
      console.error(err);
      alert("Failed to post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="mb-3">
        <UploadWidget onUpload={handleUpload} />
      </div>

      {mediaUrl && (
        <div className="mb-3">
          {mediaType === "video" ? (
            <video className="post-media" controls src={mediaUrl} />
          ) : (
            <img className="post-media" alt="preview" src={mediaUrl} />
          )}
        </div>
      )}

      <div className="d-grid">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Posting..." : "Post Incident"}
        </button>
      </div>
    </form>
  );
}
