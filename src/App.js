import React from 'react';
import './App.css';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

function App() {
  console.log(getCategories());
  console.log(getProductsFromCategoryAndQuery('MLB1055', 'Motorola'));
  return (
    <div>
      Iniciando a Online Store!
    </div>
  );
}

export default App;
