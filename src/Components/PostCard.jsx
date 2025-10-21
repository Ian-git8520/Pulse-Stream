import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="card mb-3">
      {post.mediaType === "video" ? (
        <video className="post-media" controls src={post.mediaUrl} />
      ) : (
        <img className="post-media" src={post.mediaUrl} alt={post.title} />
      )}
      <div className="card-body">
        <h5>{post.title}</h5>
        <p className="text-muted small">{new Date(post.createdAt).toLocaleString()}</p>
        <p>{post.description}</p>
        <Link to={`/post/${post.id}`} className="btn btn-sm btn-outline-primary">View</Link>
      </div>
    </div>
  );
}
