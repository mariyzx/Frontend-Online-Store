import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import '../styles/Home.css';
import logo from '../images/logo.png';
import icon from '../images/icon.png';

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
        <header>
          <img src={ icon } width="150px" height="140px" alt="Logo do site" />
          <h1>Front-end Online Store</h1>
          <button
            type="button"
            data-testid="shopping-cart-button"
            onClick={ () => history.push('/carrinho') }
          >
            <img
              src={ logo }
              alt="Carrinho"
              width="37px"
            />
          </button>
        </header>
        <div className="search">
          <div className="input-search">
            <label htmlFor="search">
              <input
                type="text"
                placeholder="Produto.."
                className="form-control"
                data-testid="query-input"
                name="search"
                onChange={ (e) => this.seachProduct(e) }
              />
            </label>
            <input
              type="button"
              className="button-search"
              value="Procurar"
              data-testid="query-button"
              onClick={ () => this.fetchProducts() }
            />
          </div>
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <div className="main">
            <div className="categories">
              {loading ? <h3>Carregando...</h3> : categories.map((cat) => (
                <div key={ cat.id } className="form-check">
                  <label
                    className="form-check-label"
                    htmlFor="category"
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      data-testid="category"
                      value={ cat.name }
                      onClick={ () => this.fetchCategory(cat.id) }
                      checked={ catProduct === cat.id }
                    />
                    {cat.name}
                  </label>
                </div>))}
            </div>

            <div className="products">
              {!loading && (products.length !== 0 ? products.map((prod) => (
                <div key={ prod.id } className="product" data-testid="product">
                  <Link to={ `/detalhes${prod.id}` }>
                    <img className="img-prod" src={ prod.thumbnail } alt={ prod.title } />
                  </Link>
                  <h3>{ prod.title }</h3>
                  <Link to={ `/detalhes${prod.id}` } data-testid="product-detail-link">
                    <h4>
                      { prod.price }
                      {' '}
                      {prod.currency_id}
                    </h4>
                  </Link>
                  <div className="add-to-cart">
                    <button
                      type="button"
                      data-testid="product-add-to-cart"
                      className="add-to-cart-button"
                      onClick={ () => this.addToCart(prod) }
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              )) : <h2>Nenhum produto foi encontrado</h2>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Home;
