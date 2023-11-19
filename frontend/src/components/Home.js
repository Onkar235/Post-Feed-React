// frontend/src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch the JWT token from local storage
      const response = await axios.post(
        'http://localhost:3001/api/posts',
        {
          userName: user.username,
          text: newPost,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request headers
          },
        }
      );
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
  

  const handleCommentSubmit = async (postId, commentMessage) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/posts/${postId}/comments`, {
        userName: user.username, // Assuming user is an object with a username property
        text: commentMessage,
      });

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, comments: [...post.comments, response.data] };
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:3001/api/posts');
      const filteredResults = response.data.filter((post) => {
        return (
          post.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.comments.some((comment) =>
            comment.text.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching posts for search:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Welcome, {user && user.username}!</h1>

      {/* Create Post */}
      <div>
        <textarea
          rows="3"
          placeholder="Write your post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="inputField"
        />
        <button onClick={handlePostSubmit} className="buttonPrimary">
          Post
        </button>
      </div>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search posts and comments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="inputField"
        />
        <button onClick={handleSearch} className="buttonPrimary">
          Search
        </button>
        {loading && <p className="loadingText">Loading...</p>}
      </div>

      {/* Display Search Results or Posts */}
      {searchResults.length > 0 ? (
        <div>
          <h2 className="heading">Search Results:</h2>
          {searchResults.map((result) => (
            <div key={result._id}>
              <p>{result.userName} - {result.text}</p>
              {result.comments.map((comment) => (
                <p key={comment._id}>{comment.userName} - {comment.text}</p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="heading">Latest Posts:</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id}>
                <p>{post.userName} - {post.text}</p>
                {post.comments.map((comment) => (
                  <p key={comment._id}>{comment.userName} - {comment.text}</p>
                ))}
                {/* Add Comment */}
                <div>
                  <textarea
                    rows="2"
                    placeholder="Add a comment..."
                    onChange={(e) => {
                      const commentMessage = e.target.value;
                      handleCommentSubmit(post._id, commentMessage);
                    }}
                    className="inputField"
                  />
                  <button className="buttonPrimary">
                    Add Comment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available. Create a post!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
