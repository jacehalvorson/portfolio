import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Ecommerce from './components/Ecommerce.jsx';
import Product from './components/Product.jsx';
import Checkout from './components/Checkout.jsx';
import NFLStats from './components/NFLStats.jsx';
import './style/App.css';
import './style/Header.css';

function App( )
{
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/ecommerce" element={ <Ecommerce /> } />
        <Route path="/ecommerce/product/:productId" element={ <Product /> } />
        <Route path="/ecommerce/checkout" element={ <Checkout /> } />
        <Route path="/nflstats" element={ <NFLStats /> } />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App