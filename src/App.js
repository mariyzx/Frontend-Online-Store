import React from 'react';
import './App.css';
import { Route,
  BrowserRouter as Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  console.log(getCategories());
  console.log(getProductsFromCategoryAndQuery('MLB1055', 'Motorola'));
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/carrinho" component={ Cart } />
      </Switch>
    </Router>
  );
}

export default App;
