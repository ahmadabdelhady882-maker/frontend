import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>الصفحة الرئيسية</h2>;
}

function About() {
  return <h2>من نحن</h2>;
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">الرئيسية</Link> | <Link to="/about">عن الموقع</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
