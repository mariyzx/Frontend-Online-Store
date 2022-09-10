import React from 'react';
import './App.css';
import { Route,
  BrowserRouter as Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/carrinho" component={ Cart } />
        <Route path="/detalhes:id" render={ (props) => <Details { ...props } /> } />
      </Switch>
    </Router>
  );
}

export default App;
