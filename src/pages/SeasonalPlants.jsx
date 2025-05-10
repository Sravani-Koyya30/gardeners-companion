import React, { useState } from "react";

const seasonalPlants = {
  spring: [
    { id: "1", name: "Tulip", sunlight: "Full Sun", water: "Twice a week", fertilizer: "Every 2 weeks", description: "Tulips are vibrant flowers that bloom in the spring.", image: "/images/tulip.jpg" },
    { id: "2", name: "Daffodil", sunlight: "Full Sun", water: "Once a week", fertilizer: "Every 3 weeks", description: "Daffodils bloom in early spring and need full sunlight.", image: "/images/daffodil.jpg" },
    { id: "3", name: "Cherry Blossom", sunlight: "Full Sun", water: "Moderate", fertilizer: "Monthly", description: "Cherry blossoms are iconic trees that bloom in spring.", image: "/images/cherry-blossom.jpg" },
    { id: "4", name: "Lettuce", sunlight: "Partial Sun", water: "Daily", fertilizer: "Every 3 weeks", description: "Lettuce grows quickly and prefers cooler temperatures.", image: "/images/lettuce.jpg" },
    { id: "5", name: "Broccoli", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every 4 weeks", description: "Broccoli is a cool-season vegetable that grows best in spring.", image: "/images/broccoli.jpg" },
    { id: "6", name: "Spinach", sunlight: "Partial Sun", water: "Every 2 days", fertilizer: "Every 4 weeks", description: "Spinach grows well in cool temperatures and needs well-drained soil.", image: "/images/spinach.jpg" },
    { id: "7", name: "Carrot", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Carrots thrive in cooler weather and need well-drained soil.", image: "/images/carrot.jpeg" },
    { id: "8", name: "Peas", sunlight: "Partial Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Peas are cool-season vegetables that need support for climbing.", image: "/images/peas.jpg" },
    { id: "9", name: "Strawberry", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 2 weeks", description: "Strawberries are a favorite spring fruit that thrive in mild temperatures.", image: "/images/strawberry.jpeg" },
    { id: "10", name: "Radish", sunlight: "Full Sun", water: "Daily", fertilizer: "Every 4 weeks", description: "Radishes grow quickly and are perfect for spring gardening.", image: "/images/radish.jpg" },
    { id: "11", name: "Beetroot", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every 4 weeks", description: "Beetroots grow best in loose soil and require moderate watering.", image: "/images/beetroot.jpg" },
    { id: "12", name: "Cabbage", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Cabbage grows well in cool temperatures and needs regular watering.", image: "/images/cabbage.jpg" },
  ],
  summer: [
    { id: "13", name: "Sunflower", sunlight: "Full Sun", water: "Daily", fertilizer: "Every 3 weeks", description: "Sunflowers thrive in hot weather and follow the sun.", image: "/images/sunflower.jpg" },
    { id: "14", name: "Marigold", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 4 weeks", description: "Marigolds add color to summer gardens and require little care.", image: "/images/marigold.jpeg" },
    { id: "15", name: "Tomato", sunlight: "Full Sun", water: "Daily", fertilizer: "Every 2 weeks", description: "Tomatoes grow best in warm weather and require daily watering.", image: "/images/tomato.jpg" },
    { id: "16", name: "Cucumber", sunlight: "Full Sun", water: "Daily", fertilizer: "Every 3 weeks", description: "Cucumbers are summer vegetables that need plenty of water.", image: "/images/cucumber.jpg" },
    { id: "17", name: "Watermelon", sunlight: "Full Sun", water: "Daily", fertilizer: "Every 2 weeks", description: "Watermelons thrive in hot summers and require constant hydration.", image: "/images/watermelon.jpg" },
    { id: "18", name: "Mango", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every month", description: "Mango trees love the summer heat and produce sweet tropical fruit.", image: "/images/mango.jpg" },
    { id: "19", name: "Eggplant", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every 2 weeks", description: "Eggplants are heat-loving vegetables that need rich soil.", image: "/images/eggplant.jpg" },
    { id: "20", name: "Corn", sunlight: "Full Sun", water: "Daily", fertilizer: "Every 2 weeks", description: "Corn needs plenty of sun, space, and frequent watering.", image: "/images/corn.jpg" },
    { id: "21", name: "Peach", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Peaches grow well in warm summers and need regular pruning.", image: "/images/peach.jpg" },
    { id: "22", name: "Zucchini", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every 3 weeks", description: "Zucchinis are productive summer plants that need plenty of sun.", image: "/images/zucchini.jpg" },
    { id: "23", name: "Basil", sunlight: "Full Sun", water: "Daily", fertilizer: "Every 3 weeks", description: "Basil is a summer herb with aromatic leaves used in cooking.", image: "/images/basil.jpeg" },
    { id: "24", name: "Bell Pepper", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Bell peppers require warm temperatures and regular watering.", image: "/images/bellpepper.jpg" },
  ],
  fall: [
    { id: "25", name: "Chrysanthemum", sunlight: "Partial Sun", water: "Regular", fertilizer: "Monthly", description: "Chrysanthemums bloom beautifully in the fall.", image: "/images/chrysanthemum.jpg" },
    { id: "26", name: "Pumpkin", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Pumpkins are a fall favorite that require space and warm temperatures.", image: "/images/pumpkin.jpeg" },
    { id: "27", name: "Radish", sunlight: "Full Sun", water: "Daily", fertilizer: "Every 4 weeks", description: "Radishes grow quickly and are perfect for fall gardening.", image: "/images/radish.jpg" },
    { id: "28", name: "Sweet Potato", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every 4 weeks", description: "Sweet potatoes need sandy soil and warm conditions.", image: "/images/sweetpotato.jpeg" },
    { id: "29", name: "Brussels Sprouts", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Brussels sprouts grow best in cool fall weather.", image: "/images/brussels-sprouts.jpg" },
    { id: "30", name: "Apple", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every month", description: "Apple trees bear fruit in the fall and need plenty of sun.", image: "/images/apple.jpg" },
    { id: "31", name: "Pears", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every 4 weeks", description: "Pears ripen in fall and are a nutritious fruit.", image: "/images/pear.jpg" },
    { id: "32", name: "Cauliflower", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Cauliflower thrives in cooler fall temperatures.", image: "/images/cauliflower.jpg" },
  ],
  winter: [
    { id: "33", name: "Camellia", sunlight: "Partial Sun", water: "Regular", fertilizer: "Every 3 months", description: "Camellias bloom in winter and provide vibrant color.", image: "/images/camellia.jpg" },
    { id: "34", name: "Winter Jasmine", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every 4 weeks", description: "Winter jasmine brightens up cold months with yellow flowers.", image: "/images/winter-jasmine.jpg" },
    { id: "35", name: "Garlic", sunlight: "Full Sun", water: "Every 7 days", fertilizer: "Every 6 weeks", description: "Garlic grows best in the winter with minimal watering.", image: "/images/garlic.jpg" },
    { id: "36", name: "Kale", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 3 weeks", description: "Kale thrives in cold weather and is packed with nutrients.", image: "/images/kale.jpg" },
    { id: "38", name: "Pomegranate", sunlight: "Full Sun", water: "Every 2 days", fertilizer: "Every 4 weeks", description: "Pomegranates are harvested in late fall and winter.", image: "/images/pomegranate.jpg" },
    { id: "39", name: "Oranges", sunlight: "Full Sun", water: "Every 3 days", fertilizer: "Every month", description: "Orange trees bear fruit in winter and require sunny climates.", image: "/images/orange.jpg" },
  ],
};

// Season images
const seasonImages = {
  spring: "/images/spring.jpg",
  summer: "/images/summer.jpg",
  fall: "/images/fall.jpeg",
  winter: "/images/winter.jpg",
};

const SeasonalPlants = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  const openPopup = (season) => {
    setSelectedSeason(season);
  };

  const closePopup = () => {
    setSelectedSeason(null);
  };

  return (
    <div style={styles.container}>
      <h1>🌱 Seasonal Plants</h1>
      <div style={styles.seasonGrid}>
        {Object.keys(seasonalPlants).map((season) => (
          <div key={season} onClick={() => openPopup(season)} style={styles.seasonCard}>
            <img src={seasonImages[season]} alt={season} style={styles.seasonImage} />
            <h2 style={styles.seasonTitle}>{season.charAt(0).toUpperCase() + season.slice(1)}</h2>
          </div>
        ))}
      </div>

      {/* Popup Modal for Season Plants */}
      {selectedSeason && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>{selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} Plants</h2>
            <button onClick={closePopup} style={styles.closeButton}>Close</button>
            <div style={styles.plantGrid}>
              {seasonalPlants[selectedSeason].map((plant) => (
                <div key={plant.id} style={styles.plantCard}>
                  <img src={plant.image} alt={plant.name} style={styles.plantImage} />
                  <h3>{plant.name}</h3>
                  <p><strong>Sunlight:</strong> {plant.sunlight}</p>
                  <p><strong>Watering:</strong> {plant.water}</p>
                  <p><strong>Fertilizer:</strong> {plant.fertilizer}</p>
                  <p>{plant.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  seasonGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" },
  seasonCard: { cursor: "pointer", textAlign: "center", borderRadius: "10px", overflow: "hidden", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)" },
  seasonImage: { width: "100%", height: "150px", objectFit: "cover" },
  seasonTitle: { margin: "10px 0", fontSize: "18px", fontWeight: "bold" },
  closeButton: { background: "#FF4D4D", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none", marginTop: "10px" },
  plantGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" },
  plantCard: { background: "#f5f5f5", padding: "15px", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", textAlign: "center" },
  plantImage: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" },

  popupOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    popupContent: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "600px",
      maxHeight: "80vh",  // ✅ Prevents popup from growing too tall
      overflowY: "auto",  // ✅ Enables vertical scrolling
      boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
      textAlign: "center",
    },
};

export default SeasonalPlants;