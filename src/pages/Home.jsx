import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      loading: false,
      nameProduct: '',
      products: [],
    };
  }

  componentDidMount() {
    this.categories();
  }

  categories = async () => {
    this.setState({ loading: true });
    const cat = await getCategories();
    this.setState({ categories: cat, loading: false });
  };

  seachProduct = ({ target }) => {
    this.setState({ nameProduct: target.value });
  }

  fetchProducts = async () => {
    const { nameProduct } = this.state;
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${nameProduct}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ products: data.results });
  }

  render() {
    const { history } = this.props;
    const { loading, categories, products } = this.state;
    return (
      <div>
        <label htmlFor="search">
          <input
            type="text"
            data-testid="query-input"
            name="search"
            onChange={ (e) => this.seachProduct(e) }
          />
          <input
            type="button"
            value="Procurar"
            data-testid="query-button"
            onClick={ () => this.fetchProducts() }
          />
        </label>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/carrinho') }
        >
          Carrinho
        </button>
        <div>
          {!loading && (
            categories.map((cat) => (
              <label htmlFor="category" key={ cat.id } data-testid="category">
                <input type="radio" />
                {cat.name}
              </label>))
          )}
        </div>
        <div>
          {products.length !== 0 ? products.map((prod) => (
            <div key={ prod.id } data-testid="product">
              <img src={ prod.thumbnail } alt={ prod.title } />
              <h3>{ prod.title }</h3>
              <h4>
                { prod.price }
                {' '}
                {prod.currency_id}
              </h4>
            </div>
          )) : <h2>Nenhum produto foi encontrado</h2>}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Home;
