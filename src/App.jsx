// src/App.js
import React, { useState } from 'react';
import Search from './Search';
import PostDetails from './PostDetails';

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  return (
    <div>
      {selectedPostId === null ? (
        <Search onPostClick={handlePostClick} />
      ) : (
        <PostDetails postId={selectedPostId} />
      )}
    </div>
  );
};

export default App;
