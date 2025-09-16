import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import CarriersList from "./pages/CarriersList";

export default function App(){
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/carriers' element={<CarriersList />} />
      </Routes>
    </div>
  );
}
