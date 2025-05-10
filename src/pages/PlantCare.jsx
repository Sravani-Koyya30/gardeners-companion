import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import plantsData from "./plantsData";

const PlantCare = () => {
  const [savedPlants, setSavedPlants] = useState([]);
  const [notes, setNotes] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    const fetchSavedPlants = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);

      if (userData.exists() && userData.data().savedPlants) {
        const savedPlantIds = userData.data().savedPlants.map((p) => p.id);
        const fullPlantData = savedPlantIds
          .map((id) => plantsData.find((plant) => plant.id === id))
          .filter(Boolean);

        setSavedPlants(fullPlantData);
        setNotes(userData.data().plantNotes || {});
      }
    };

    fetchSavedPlants();
  }, []);

  const saveNote = async (plantId, note) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const updatedNotes = { ...notes, [plantId]: note };
      await updateDoc(userRef, { plantNotes: updatedNotes });
      setNotes(updatedNotes);
      setEditMode({ ...editMode, [plantId]: false });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="plantcare-container">
      <h2>🌼 My Plant Care</h2>

      {savedPlants.length === 0 ? (
        <p>You haven't saved any plants yet.</p>
      ) : (
        savedPlants.map((plant) => (
          <div key={plant.id} className="plant-card">
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            {editMode[plant.id] ? (
              <div>
                <textarea
                  value={notes[plant.id] || ""}
                  onChange={(e) => setNotes({ ...notes, [plant.id]: e.target.value })}
                />
                <button onClick={() => saveNote(plant.id, notes[plant.id])}>Save</button>
              </div>
            ) : (
              <div>
                <p><strong>Your Note:</strong> {notes[plant.id] || "No note yet."}</p>
                <button onClick={() => setEditMode({ ...editMode, [plant.id]: true })}>Edit Note</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PlantCare;
