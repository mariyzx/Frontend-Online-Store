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
    const newCart = prod.map((a) => {
      const qnt = localStorage.getItem(prod.id);
      a.quantity = qnt;
      return a;
    });
    this.setState({ products: newCart });
  }

  countFunc = (id, { target }) => {
    const { products } = this.state;
    const one = 1;
    let qnt = Number(localStorage.getItem(id));
    if (target.value === 'decrease' && qnt === one) {
      return false;
    }
    if (target.value === 'increase') {
      qnt += 1;
    }
    if (target.value === 'decrease') {
      qnt -= 1;
    }
    localStorage.setItem(id, qnt);
    const arr = products.map((item) => {
      if (item.id === id) {
        item.quantity = qnt;
        return item;
      }
      return item;
    });

    this.setState({ products: arr });
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
              <button
                data-testid="product-decrease-quantity"
                type="button"
                value="decrease"
                onClick={ (e) => this.countFunc(item.id, e) }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                {localStorage.getItem(item.id)}
              </p>
              <button
                data-testid="product-increase-quantity"
                type="button"
                value="increase"
                onClick={ (e) => this.countFunc(item.id, e) }
              >
                +
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default Cart;
