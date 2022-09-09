import React from 'react';

function Home() {
  return (
    <div>
      <input type="text" />
      <p
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    </div>
  );
}

export default Home;
