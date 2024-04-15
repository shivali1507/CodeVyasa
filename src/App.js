import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/MainPage/Main";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Header />
        <Main className="main" />
      </div>
    </div>
  );
}

export default App;
