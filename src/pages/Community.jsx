import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  collection, addDoc, onSnapshot, query, orderBy
} from "firebase/firestore";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [user, setUser] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const postsCollection = query(collection(db, "communityPosts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((loggedInUser) => {
      setUser(loggedInUser);
    });
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to post!");
      return;
    }

    setIsPosting(true);

    try {
      const userName = user.displayName || user.email;
      await addDoc(collection(db, "communityPosts"), {
        title: newPost.title,
        content: newPost.content,
        author: userName,
        userId: user.uid,
        timestamp: new Date()
      });
      setNewPost({ title: "", content: "" });
    } catch (error) {
      console.error("Error posting:", error);
    }

    setIsPosting(false);
  };

  return (
    <div className="community-container">
      <h2>🌱 Community Forum</h2>

      <form className="community-form" onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          placeholder="What's on your mind?"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
        />
        <button type="submit" disabled={isPosting}>
          {isPosting ? "Posting..." : "Post"}
        </button>
      </form>

      <div className="community-posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <span>— {post.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
