import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Cards from './Cards.jsx';
import Ecommerce from './Ecommerce.jsx';
import Product from './Product.jsx';
import Checkout from './Checkout.jsx';
import { ReadJSONAndExecuteSetter } from './utils.js';
import './App.css';
import './Header.css';
import './HomePage.css';

function App( )
{
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={ <Cards /> } />
        <Route path="/ecommerce" element={ <Ecommerce /> } />
        <Route path="/product/:productId" element={ <Product /> } />
        <Route path="/ecommerce/checkout" element={ <Checkout /> } />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App