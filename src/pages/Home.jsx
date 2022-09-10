import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      loading: false,
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

  render() {
    const { history } = this.props;
    const { loading, categories } = this.state;
    return (
      <div>
        <input type="text" />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <button
          type="button"
          data-testid=""
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
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Home;
