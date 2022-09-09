import React from 'react';
import './App.css';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Home from './pages/Home';

function App() {
  console.log(getCategories());
  console.log(getProductsFromCategoryAndQuery('MLB1055', 'Motorola'));
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
