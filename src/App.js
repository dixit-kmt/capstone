import './App.css';

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Pricing from "./pages/pricing/Pricing";
import Contact from "./pages/contact/Contact";
import Header from "./pages/common/header/Header";
import Footer from "./pages/common/footer/Footer";
import LovelyDatabase from "./pages/home/hero/LovelyDatabase";
import BitsPilani from "./pages/home/hero/BitsPilani";
import Mit from "./pages/home/hero/Mit";
import WishlistModal from "./pages/common/header/WishlistModal";

import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/SignUp.page";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistModalOpen, setWishlistModalOpen] = useState(false);

  const handleWishlistClick = () => {
    setWishlistModalOpen(true);
  };

  const handleWishlistClose = () => {
    setWishlistModalOpen(false);
  };
  return (
    <BrowserRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      <Header wishlist={wishlist} onWishlistClick={handleWishlistClick} />
      {isWishlistModalOpen && (
        <WishlistModal wishlist={wishlist} onClose={handleWishlistClose} />
      )}
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route
              exact
              path="/lovelydatabase"
              element={
                <LovelyDatabase setWishlist={setWishlist} wishlist={wishlist} />
              }
            />
            <Route
              exact
              path="/bitsPilani"
              element={
                <BitsPilani setWishlist={setWishlist} wishlist={wishlist} />
              }
            />
            <Route
              exact
              path="/manipal"
              element={<Mit setWishlist={setWishlist} wishlist={wishlist} />}
            />
          </Route>
        </Routes>
      </UserProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

