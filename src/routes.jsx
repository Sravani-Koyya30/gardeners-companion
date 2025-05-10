import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlantDatabase from "./pages/PlantDatabase";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import PlantCare from "./pages/PlantCare";
import SeasonalPlants from "./pages/SeasonalPlants";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

const AppRoutes = () => {
  return (
    <>
      <Navbar /> {/* Navbar stays outside of Routes so it's visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plant-database" element={<PlantDatabase />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/plant-care" element={<PlantCare />} />
        <Route path="/seasonal-plants" element={<SeasonalPlants />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;