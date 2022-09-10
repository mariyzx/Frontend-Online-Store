import React from 'react';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      submit: false,
    };
  }

  finish = (e) => {
    e.preventDefault();
    this.setState({ submit: true });
  }

  render() {
    const { submit } = this.state;
    return (
      <div>
        <h1>Finalizar compra</h1>
        {submit ? <h2>Obrigado pela compra!</h2> : (
          <form>
            <input
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
            />
            <input type="email" data-testid="checkout-email" placeholder="Email" />
            <input type="text" data-testid="checkout-cpf" placeholder="CPF" />
            <input type="text" data-testid="checkout-phone" placeholder="Telefone" />
            <input type="text" data-testid="checkout-cep" placeholder="CEP" />
            <input type="text" data-testid="checkout-address" placeholder="Endereço" />
            <button type="button" onClick={ (e) => this.finish(e) }>Finalizar</button>
          </form>
        )}
      </div>
    );
  }
}

export default Checkout;
