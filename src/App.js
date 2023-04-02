import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import Cards from './Cards.js';
import Ecommerce from './Ecommerce.js';
import Product from './Product.js';
import './App.css';
import './Header.css';
import './HomePage.css';

function App( )
{
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/product/:productId" element={<Product />}
      />
      </Routes>
    </Router>
  );
}

export default App