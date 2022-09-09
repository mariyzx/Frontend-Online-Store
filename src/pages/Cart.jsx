import React from 'react';

class Cart extends React.Component {
  render() {
    return (
      <div data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </div>
    );
  }
}

export default Cart;
