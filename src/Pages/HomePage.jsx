import React, { useEffect, useState } from 'react';


function Home() {
  const [message, setMessage] = useState('');
  const [username,] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/`)
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error fetching home page message:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Welcome to PulseStream, {username}</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home;