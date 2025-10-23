import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import "./index.css";
import FeedPage from "./Pages/FeedPage";
import AppHero from "./AppHero";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ReportPage from "./Pages/ReportPage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AboutPage from "./Pages/AboutPage";
import IncidentDetail from "./Pages/IncidentDetail";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={ <AppHero/>} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/incident/:id" element={<IncidentDetail />} />
      </Routes>
  </BrowserRouter>

);


 
