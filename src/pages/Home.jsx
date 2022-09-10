import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      loading: false,
      nameProduct: '',
      catProduct: '',
      products: [],
      cartProd: [],
    };
  }

  componentDidMount() {
    this.categories();
    if (localStorage.length === 0) { return localStorage.setItem('cart', '[]'); }
  }

  categories = async () => {
    const cat = await getCategories();
    this.setState({ categories: cat });
  };

  seachProduct = ({ target }) => {
    this.setState({ nameProduct: target.value });
  }

  fetchProducts = async () => {
    this.setState({ loading: true });
    const { nameProduct } = this.state;
    const data = await getProductsFromCategoryAndQuery(null, nameProduct);
    this.setState({ products: data.results, loading: false });
  }

  fetchCategory = async (id) => {
    this.setState({ catProduct: id });
    const data = await getProductsFromCategoryAndQuery(id, null);
    this.setState({ products: data.results });
  }

  localStg = (product) => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    if (localStorageCart.some((element) => element.id === product.id)) {
      let count = Number(localStorage.getItem(product.id));
      localStorage.setItem(product.id, count += 1);
    } else {
      const carrinho = [...localStorageCart, product];
      localStorage.setItem('cart', JSON.stringify(carrinho));
      localStorage.setItem(product.id, 1);
    }
  }

  addToCart = (prod) => {
    this.setState((prevState) => ({
      cartProd: [...prevState.cartProd, prod],
    }), this.localStg(prod));
  }

  render() {
    const { history } = this.props;
    const { loading, categories, products, catProduct } = this.state;
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
          {!loading && categories.map((cat) => (
            <label htmlFor="category" key={ cat.id }>
              <input
                type="radio"
                data-testid="category"
                value={ cat.name }
                onClick={ () => this.fetchCategory(cat.id) }
                hecked={ catProduct === cat.id }
              />
              {cat.name}
            </label>))}
        </div>
        <div>
          {!loading && (products.length !== 0 ? products.map((prod) => (
            <div key={ prod.id } data-testid="product">
              <Link to={ `/detalhes${prod.id}` } data-testid="product-detail-link">
                <img src={ prod.thumbnail } alt={ prod.title } />
                <h3>{ prod.title }</h3>
                <h4>
                  { prod.price }
                  {' '}
                  {prod.currency_id}
                </h4>
              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.addToCart(prod) }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          )) : <h2>Nenhum produto foi encontrado</h2>)}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Home;
