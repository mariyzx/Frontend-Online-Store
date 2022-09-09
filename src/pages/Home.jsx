import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
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
        data-testid="shopping-cart-button"
        onClick={ () => {
          history.push('/carrinho');
        } }
      >
        Carrinho

      </button>
    </div>
  );
}

export default Home;
