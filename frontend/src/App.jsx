

import React, { useState } from "react";

import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import Verify from "./Components/Verify/Verify";
import MyOrder from "./pages/MyOrders/MyOrder";
const App = () => {
  const [showLogin,setShowLogin]= useState(false);
  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/>: <></>}
      <div className="App">
        <Navbar setShowLogin = {setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<MyOrder/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
