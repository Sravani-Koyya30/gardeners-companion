// ✅ Final Updated PlantDatabase.jsx (Synced with Dashboard, Saves Only Plant IDs)
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import plants from "./plantsData";

const PlantDatabase = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [savedPlants, setSavedPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSavedPlants = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const savedPlantsData = userDoc.data().savedPlants || [];
          setSavedPlants(savedPlantsData.map((p) => p.id));
        }
      } catch (error) {
        console.error("Error fetching saved plants:", error);
      }
    };

    fetchSavedPlants();
  }, []);

  const savePlant = async (plant) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to save plants!");
      return;
    }

    if (savedPlants.includes(plant.id)) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          savedPlants: arrayUnion({ id: plant.id }),
        });
      } else {
        await setDoc(userRef, {
          savedPlants: [{ id: plant.id }],
        });
      }

      setSavedPlants((prev) => [...prev, plant.id]);
    } catch (error) {
      console.error("Error saving plant:", error);
    }
  };

  const filteredPlants = plants
    .filter((plant) => plant.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={styles.container}>
      <h1>🌿 Plant Database</h1>
      <input
        type="text"
        placeholder="Search plants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />

      <ul style={styles.list}>
        {filteredPlants.map((plant) => (
          <li key={plant.id} style={styles.listItem}>
            <img src={plant.image} alt={plant.name} style={styles.image} />
            <h2>{plant.name}</h2>
            <p><strong>Sunlight:</strong> {plant.sunlight}</p>
            <p><strong>Watering:</strong> {plant.water}</p>
            <div style={styles.buttonContainer}>
              <button onClick={() => setSelectedPlant(plant)} style={styles.viewButton}>
                View Details
              </button>
              <button
                onClick={() => savePlant(plant)}
                style={savedPlants.includes(plant.id) ? styles.savedButton : styles.saveButton}
              >
                {savedPlants.includes(plant.id) ? "Saved" : "Save Plant"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedPlant && (
        <div style={styles.popupOverlay} onClick={() => setSelectedPlant(null)}>
          <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPlant.name} Details</h2>
            <img src={selectedPlant.image} alt={selectedPlant.name} style={styles.popupImage} />
            <p><strong>About:</strong> {selectedPlant.description}</p>

            <h3>🌱 Plant Care</h3>
            <p><strong>Sunlight:</strong> {selectedPlant.sunlight}</p>
            <p><strong>Watering:</strong> {selectedPlant.water}</p>
            <p><strong>Fertilizer:</strong> {selectedPlant.fertilizer}</p>

            <h3>🌡 Ideal Temperature</h3>
            <p>Best grown in temperatures of <strong>18-30°C (65-85°F)</strong>.</p>

            <h3>🌱 Soil Type</h3>
            <p>Prefers <strong>well-drained, loamy soil</strong> with good aeration.</p>

            <h3>⏳ Growth Time</h3>
            <p>Typically takes <strong>6-12 weeks</strong> to fully mature.</p>

            <h3>🍽 Common Uses</h3>
            <p>Used for <strong>cooking, medicine, and decoration</strong>.</p>

            <h3>🐛 Pests & Diseases</h3>
            <p>Watch out for <strong>aphids, fungus gnats, and powdery mildew</strong>.</p>

            <h3>🌿 Propagation</h3>
            <p>Can be propagated through <strong>seeds, cuttings, or grafting</strong>.</p>

            <button onClick={() => setSelectedPlant(null)} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  searchBar: { width: "80%", padding: "10px", borderRadius: "5px", marginBottom: "20px" },
  list: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center"
  },
  listItem: {
    background: "#f5f5f5",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  image: { width: "160px", height: "160px", objectFit: "cover", borderRadius: "10px" },
  buttonContainer: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" },
  viewButton: { background: "#007BFF", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none" },
  saveButton: { background: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none" },
  savedButton: { background: "#B0BEC5", color: "white", padding: "10px", borderRadius: "5px", border: "none" },
  popupOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  popupContent: { background: "white", padding: "20px", borderRadius: "10px", textAlign: "center", width: "350px", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)", overflowY: "auto", maxHeight: "80vh" },
  popupImage: { width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" },
  closeButton: { background: "#FF4D4D", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none", marginTop: "10px" }
};

export default PlantDatabase;
