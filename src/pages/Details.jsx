import React from 'react';
import propTypes from 'prop-types';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      product: '',
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getProduct(id);
  }

  getProduct = async (id) => {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ product: data, loading: false });
  }

  render() {
    const { product, loading } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1>Detalhes</h1>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/carrinho') }
        >
          Carrinho
        </button>
        { !loading && (
          <div>
            <img src={ product.thumbnail } alt={ product.title } />
            <h3 data-testid="product-detail-name">{product.title}</h3>
            <h4>
              {product.price}
              {' '}
              {product.currency_id}
            </h4>
          </div>
        )}
      </div>
    );
  }
}

Details.propTypes = {
  id: propTypes.string.isRequired,
  match: propTypes.objectOf(propTypes.string).isRequired,
  history: propTypes.func.isRequired,
};

export default Details;
