// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import App2 from './App2';

const AppRouter = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App cart={cart} setCart={setCart} />} />
        <Route path="/payment" element={<App2 cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
