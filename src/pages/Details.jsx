import React from 'react';
import propTypes from 'prop-types';
import '../styles/Details.css';
import logo from '../images/logo.png';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      product: '',
      loading: true,
      review: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getProduct(id);
    if (localStorage.length === 0) {
      return localStorage.setItem('cart', '[]');
    }
    if (!localStorage.getItem('UserReview')) {
      localStorage.setItem('UserReview', '[]');
    }

    this.getReview();
  }

  getProduct = async (id) => {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ product: data, loading: false });
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

  getReview = () => {
    const x = JSON.parse(localStorage.getItem('UserReview'));
    this.setState({
      review: x,
    });
  }

  addToCart = (prod) => {
    this.localStg(prod);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  reset = () => {
    this.setState({
      detail: '',
      rating: '',
      email: '',
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { detail, rating, email } = this.state;
    const aval = { detail, rating, email };

    const getAval = JSON.parse(localStorage.getItem('UserReview'));

    const newAval = ([...getAval, aval]);

    localStorage.setItem('UserReview', JSON.stringify(newAval));
    this.setState((prevState) => ({
      review: [...prevState.review, aval],
    }));

    this.reset();
  }

  render() {
    const { product, loading, email, detail, review } = this.state;
    const { history } = this.props;
    return (
      <div className="main">
        <div>
          <h1>Detalhes</h1>
          <button
            type="button"
            data-testid="shopping-cart-button"
            className="cart-button"
            onClick={ () => history.push('/carrinho') }
          >
            <img
              src={ logo }
              alt="Carrinho"
              width="37px"
            />
          </button>
        </div>
        <div className="info-details">
          { !loading && (
            <div className="product-detail">
              <img src={ product.thumbnail } alt={ product.title } />
              <h3 data-testid="product-detail-name">{product.title}</h3>
              <h4>
                {product.price}
                {' '}
                {product.currency_id}
              </h4>
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                className="add-btn"
                onClick={ () => this.addToCart(product) }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          )}
          <form className="form-detail">
            <h1>Insira sua avaliação</h1>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              data-testid="product-detail-email"
              placeholder="Email"
            />
            <label htmlFor="rating">
              <div className="div-estrelas">
                Estrelas
              </div>
              <input
                onChange={ this.handleChange }
                type="radio"
                className="form-check-input"
                name="rating"
                value={ 1 }
                data-testid="1-rating"
              />
              <input
                onChange={ this.handleChange }
                type="radio"
                className="form-check-input"
                name="rating"
                value={ 2 }
                data-testid="2-rating"
              />
              <input
                onChange={ this.handleChange }
                type="radio"
                className="form-check-input"
                name="rating"
                value={ 3 }
                data-testid="3-rating"
              />
              <input
                onChange={ this.handleChange }
                type="radio"
                className="form-check-input"
                name="rating"
                value={ 4 }
                data-testid="4-rating"
              />
              <input
                onChange={ this.handleChange }
                className="form-check-input"
                type="radio"
                name="rating"
                value={ 5 }
                data-testid="5-rating"
              />
            </label>
            <textarea
              name="detail"
              className="form-control textarea"
              onChange={ this.handleChange }
              placeholder="Escreva sua avaliação"
              value={ detail }
              data-testid="product-detail-evaluation"
            />
            <button
              type="submit"
              onClick={ this.handleClick }
              data-testid="submit-review-btn"
              className="submit-btn"
            >
              Enviar

            </button>
          </form>
        </div>
        <div className="avaliaçoes">
          <h1>Avaliações</h1>
          {review.map((aval) => (
            <div key={ aval.email } className="aval">
              <h3>
                Email:
                {' '}
                {aval.email}
              </h3>
              <p>
                Estrelas:
                {' '}
                {aval.rating}
              </p>
              <p>
                Avaliação:
                {' '}
                {aval.detail}
              </p>
            </div>
          ))}
        </div>
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
