import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then(res => res.json())
      .then(setPosts);
  }, []);

  // const addPost = (newPost) => setPosts([...posts, newPost]);

  return (
    <div className="container mt-4">
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

export default Home;

