import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet }  from 'react-helmet';
import Home from './home/home.jsx';
import Conway from './conway/conway.jsx';
import Ecommerce from './ecommerce/ecommerce.jsx';
import Product from './ecommerce/product.jsx';
import Checkout from './ecommerce/checkout.jsx';
import NFLStats from './stat_huddle/stat_huddle.jsx';
import PlayoffBracket from './playoff_bracket/playoff_bracket.jsx';

function App( )
{
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/conway" element={ <Conway /> } />
        <Route path="/ecommerce" element={ <Ecommerce /> } />
        <Route path="/ecommerce/product/:productId" element={ <Product /> } />
        <Route path="/ecommerce/checkout" element={ <Checkout /> } />
        <Route path="/stathuddle" element={ <NFLStats /> } />
        <Route path="/playoffbracket" element={
          <>
            <Helmet>
              <title>2025 Playoff Bracket</title>
            </Helmet>
              <PlayoffBracket />
          </>
        } />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App