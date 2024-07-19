// src/Home.js
import React from 'react';
import { useAuth } from './AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ backgroundColor: "#205934", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "white", fontSize: "40px", fontWeight: 'bold' }}>
        Welcome, {currentUser ? currentUser.email : "Guest"}!
      </p>
    </div>
  );
};

export default Home;
