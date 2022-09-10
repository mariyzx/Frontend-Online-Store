import React from 'react';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const prod = JSON.parse(localStorage.getItem('cart'));
    this.setState({ products: prod });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        {products.length === 0 ? (
          <div data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </div>)
          : products.map((item) => (
            <div key={ item.id }>
              <img src={ item.thumbnail } alt={ item.title } />
              <h4 data-testid="shopping-cart-product-name">{item.title}</h4>
              <p data-testid="shopping-cart-product-quantity">
                {localStorage.getItem(item.id)}
              </p>
            </div>
          ))}
      </div>
    );
  }
}

export default Cart;
