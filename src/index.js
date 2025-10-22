import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import "./index.css";
import { AuthProvider } from "./AuthContext";
import App from "./App";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </BrowserRouter>

);


 
