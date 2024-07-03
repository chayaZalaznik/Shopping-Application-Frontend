// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import MainPage from './components/MainPage';
import Orders from './components/OrderList';
import FavoritesPage from './components/FavoritesPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AuthProvider from './contexts/AuthContext';
import UserProfile from './components/UserProfile'; // הוספת קומפוננטת UserProfile
import FooterComponent from './components/FooterComponent';

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavbarComponent />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<UserProfile />} /> {/* הוספת Route לפרופיל */}
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </Router>
  </AuthProvider>
);

export default App;
