import React, { useState } from "react";
import { motion } from "framer-motion";

const API = process.env.REACT_APP_API_URL || "http://localhost:3080";

export default function Feed({ posts, setPosts, user, updatePost, removePost }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editMediaUrl, setEditMediaUrl] = useState("");

  const thumbsUp = async (post) => {
    const payload = { likes: (post.likes || 0) + 1 };
    const res = await fetch(`${API}/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    updatePost(data);
  };

  const addComment = async (postId, text) => {
    if (!text.trim()) return;
    const p = posts.find((p) => p.id === postId);
    const newComments = [...(p.comments || []), { id: Date.now(), user, text }];
    const res = await fetch(`${API}/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: newComments })
    });
    const data = await res.json();
    updatePost(data);
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title || "");
    setEditDescription(post.description || "");
    setEditMediaUrl(post.mediaUrl || "");
  };

  const saveEdit = async (id) => {
    const res = await fetch(`${API}/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, description: editDescription, mediaUrl: editMediaUrl })
    });
    const data = await res.json();
    updatePost(data);
    setEditingId(null);
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await fetch(`${API}/posts/${id}`, { method: "DELETE" });
    removePost(id);
  };

  return (
    <div>
      {posts.length === 0 && <div className="alert alert-info">No posts yet.</div>}
      {posts.map((post) => (
        <motion.div
          key={post.id}
          className="card mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="card-body">
            {editingId === post.id ? (
              <>
                <input className="form-control mb-2" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <textarea className="form-control mb-2" rows="3" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                <input className="form-control mb-2" value={editMediaUrl} onChange={(e) => setEditMediaUrl(e.target.value)} />
                <div className="d-flex gap-2">
                  <button className="btn btn-success btn-sm" onClick={() => saveEdit(post.id)}>Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h5>{post.title}</h5>
                {post.mediaType === "video" ? (
                  <video className="post-media mb-3" controls src={post.mediaUrl} />
                ) : (
                  <img className="post-media mb-3" src={post.mediaUrl} alt={post.title} />
                )}
                {post.description && <p>{post.description}</p>}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
                  <div>
                    <button className="btn btn-outline-primary btn-thumb me-2" onClick={() => thumbsUp(post)}>👍 <span className="ms-1">{post.likes || 0}</span></button>
                    {post.user === user && (
                      <>
                        <button className="btn btn-outline-secondary me-2" onClick={() => startEdit(post)}>✏️ Edit</button>
                        <button className="btn btn-outline-danger" onClick={() => deletePost(post.id)}>🗑️ Delete</button>
                      </>
                    )}
                  </div>
                </div>
                <Comments post={post} onAdd={addComment} />
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Comments({ post, onAdd }) {
  const [text, setText] = useState("");
  return (
    <div>
      <h6>Comments</h6>
      {(post.comments || []).length === 0 ? <p className="text-muted small">No comments yet.</p> :
        <ul className="list-group mb-2">
          {post.comments.map(c => <li key={c.id} className="list-group-item"><strong>{c.user}:</strong> {c.text}</li>)}
        </ul>
      }

      <form onSubmit={(e) => { e.preventDefault(); onAdd(post.id, text); setText(""); }}>
        <div className="input-group">
          <input className="form-control" value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment..." />
          <button className="btn btn-primary" type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}
