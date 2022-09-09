import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
  render() {
    const { history } = this.props;
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
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Home;
