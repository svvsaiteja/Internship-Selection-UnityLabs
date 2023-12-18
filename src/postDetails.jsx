// src/components/PostDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostDetails = ({ postId }) => {
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://hn.algolia.com/api/v1/items/${postId}`);
        setPostDetails(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    if (postId !== null) {
      fetchPostDetails();
    }
  }, [postId]);

  const stripHtmlTags = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div>
      {postDetails ? (
        <div>
          <h2>{stripHtmlTags(postDetails.title)}</h2>
          <p>Points: {postDetails.points}</p>
          <ul>
            {postDetails.children.map((comment) => (
              <li key={comment.id}>{stripHtmlTags(comment.text)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
