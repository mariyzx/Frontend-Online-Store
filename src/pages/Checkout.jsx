import React from 'react';
import '../styles/Checkout.css';

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
      <div className="main-checkout">
        <h1>Finalizar compra</h1>
        {submit ? <h2>Obrigado pela compra!</h2> : (
          <form className="form-checkout">
            <input
              className="form-control"
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
            />
            <input
              className="form-control"
              type="email"
              data-testid="checkout-email"
              placeholder="Email"
            />
            <input
              className="form-control"
              type="text"
              data-testid="checkout-cpf"
              placeholder="CPF"
            />
            <input
              className="form-control"
              type="text"
              data-testid="checkout-phone"
              placeholder="Telefone"
            />
            <input
              className="form-control"
              type="text"
              data-testid="checkout-cep"
              placeholder="CEP"
            />
            <input
              className="form-control"
              type="text"
              data-testid="checkout-address"
              placeholder="Endereço"
            />
            <button type="button" onClick={ (e) => this.finish(e) }>Finalizar</button>
          </form>
        )}
      </div>
    );
  }
}

export default Checkout;
