// ✅ src/pages/Dashboard.jsx (With Saved Plant Cards Styled Like Plant Database)
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import plantsData from "./plantsData";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [savedPlants, setSavedPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser);
        await fetchUserPosts(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (currentUser) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const savedIds = userDoc.data().savedPlants || [];
        const matchedPlants = plantsData.filter((plant) =>
          savedIds.some((saved) => saved.id === plant.id)
        );
        setSavedPlants(matchedPlants);
        setNotes(userDoc.data().notes || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserPosts = async (currentUser) => {
    try {
      const postsRef = collection(db, "communityPosts");
      const q = query(postsRef, where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUserPosts(postsData);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const saveNotes = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { notes });
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return <div style={styles.container}><p>Loading dashboard...</p></div>;
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>📄 Dashboard</h2>
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>🌿 Dashboard</h1>

      <div style={styles.profileSection}>
        <h3>{user.displayName || user.email}</h3>
      </div>

      <h2>🌱 Saved Plants</h2>
      <input
        type="text"
        placeholder="Search saved plants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />
      <div style={styles.cardGrid}>
        {savedPlants
          .filter((plant) => plant.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((plant) => (
            <div key={plant.id} style={styles.card}>
              <img src={plant.image} alt={plant.name} style={styles.cardImage} />
              <h3>{plant.name}</h3>
              <p>{plant.description}</p>
            </div>
          ))}
        {savedPlants.length === 0 && <p>No plants saved yet.</p>}
      </div>

      <h2>📝 Your Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your plant care notes here..."
        style={styles.textarea}
      ></textarea>
      <br />
      <button onClick={saveNotes} style={styles.saveButton}>Save Notes</button>

      <h2>📌 My Posts</h2>
      {userPosts.length > 0 ? (
        <ul style={styles.communityPosts}>
          {userPosts.map((post) => (
            <li key={post.id} style={styles.postItem}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>Posted on: {new Date(post.timestamp.seconds * 1000).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found. Start sharing in the community!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "30px",
    backgroundColor: "#ffffffcc",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  profileSection: {
    marginBottom: "30px",
  },
  searchBar: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "80%",
    marginBottom: "20px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#f1f8e9",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  cardImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  textarea: {
    width: "90%",
    height: "100px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  saveButton: {
    background: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  communityPosts: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
    marginTop: "20px",
  },
  postItem: {
    background: "#e8f5e9",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "12px",
    borderLeft: "5px solid #66bb6a",
  },
};

export default Dashboard;