import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import Product from "./Product";

export default function CheckoutPage() {
  const { userInformation, cart, setCart } = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adress, setAdress] = useState("");
  const [selection, setSelection] = useState("");
  const [cpf, setCpf] = useState("");
  const [celNumber, setCelNumber] = useState("");

  useEffect(() => {
    setTotalPrice(cart.reduce((t, p) => t + p.price * p.quantity, 0));
  }, []);

  function closeOrder() {
    const config = {
      headers: { Authorization: `Bearer ${userInformation}` }, //alterar pra userInformation.token depois
    };

    const body = {
      cpf,
      celNumber,
      adress,
      payment: selection,
      total: totalPrice,
      cart,
    };

    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/checkout`,
      body,
      config
    );

    request.then(alert("Sua compra foi finalizada com sucesso!"));
    request.catch((e) => {
      console.log(e);
      alert("Ocorreu um erro finalizar sua compra, tente novamente");
    });
  }

  return (
    <Container>
      <Wrapper>
        <Title>Seu pedido ({cart.length})</Title>
        <ProductsList>
          {cart.length === 0
            ? "Seu carrinho de compras está vazio!"
            : cart.map((item, i) => (
                <Product
                  key={i}
                  setTotalPrice={setTotalPrice}
                  totalPrice={totalPrice}
                  item={item}
                />
              ))}
        </ProductsList>
      </Wrapper>
      <OrderResume>
        <Title>Resumo do pedido</Title>
        <TotalWrapper>
          <div className="total-title">Total:</div>
          <div className="total-price">
            R${" "}
            {(totalPrice / 100).toFixed(2).replace(".", ",").replace("-", "")}
          </div>
        </TotalWrapper>
        <p className="title">Preencha seus dados:</p>
        <Form onSubmit={closeOrder} id="paymentform">
          <label htmlFor="adress" className="adress">
            Endereço de entrega:
          </label>
          <input
            id="adress"
            type="text"
            className="adressInput"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
          <br />
          <label htmlFor="cel" className="cel">
            Insira seu CPF:
          </label>
          <input
            id="cel"
            type="number"
            className="celInput"
            value={celNumber}
            onChange={(e) => setCelNumber(e.target.value)}
            required
          />
          <br />
          <label htmlFor="cpf" className="cpf">
            Insira seu número de celular:
          </label>
          <input
            id="cpf"
            type="number"
            className="cpfInput"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <br />
          <label className="payment" htmlFor="payment">
            Selecione uma forma de pagamento:
          </label>
          <select
            className="select"
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
            id="payment"
            name="payment"
            form="payment"
            required
          >
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Boleto">Boleto</option>
            <option value="PIX">PIX</option>
          </select>
          <ImgWrapper>
            <img
              src="https://ae01.alicdn.com/kf/HTB1fNUEaNrvK1RjSsze761ObFXaX.png"
              alt="credit-card"
            ></img>
            <img
              src="https://ae01.alicdn.com/kf/HTB1xDsCaODxK1Rjy1zc761GeXXae.png"
              alt="credit-card"
            ></img>
            <img
              src="https://ae01.alicdn.com/kf/HTB1RS7DaOHrK1Rjy0Fl763saFXax.png"
              alt="credit-card"
            ></img>
            <img
              src="https://ae01.alicdn.com/kf/HTB17y7yaIvrK1Rjy0Fe763TmVXaS.png"
              alt="credit-card"
            ></img>
          </ImgWrapper>
          <ButtonWrapper>
            <CloseOrder type="submit">Finalizar compra</CloseOrder>
            <Link to="/home">
              <GoBack>Voltar para home</GoBack>
            </Link>
          </ButtonWrapper>
        </Form>
      </OrderResume>
    </Container>
  );
}

const Form = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 640px) {
    width: 100vw;
    align-items: center;
  }
  input {
    @media (max-width: 640px) {
      width: 60vw;
    }
  }
  .adress {
    font-size: 20px;
    margin-top: 30px;
  }
  .adressInput,
  .celInput,
  .cpfInput {
    border: 1px solid #b3e283;
    border-radius: 5px;
    font-size: 15px;
    margin-top: 5px;
    :focus {
      box-shadow: 0 0 0.5em #b3e283;
      outline: 0;
    }
  }
  .payment,
  .cpf,
  .cel {
    font-size: 20px;
    margin-bottom: 5px;
    margin-top: 5px;
    text-align: center;
  }
  .select {
    margin-top: 5px;
    font-size: 18px;
    border: 1px solid #b3e283;
    border-radius: 5px;
    background-color: white;
    @media (max-width: 640px) {
      width: 60vw;
    }
    :focus {
      box-shadow: 0 0 0.5em #b3e283;
      outline: 0;
    }
  }
`;

const Container = styled.div`
  background-color: #fff;
  display: flex;
  font-family: "Raleway", sans-serif;
  max-width: 100vw;
  height: 100vh;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  @media (max-width: 640px) {
    flex-direction: column;
    height: auto;
  }
`;

const Wrapper = styled.div`
  padding-top: 50px;
  border-right: 0.1em solid black;

  @media (max-width: 640px) {
    text-align: center;
    width: 100vw;
    font-size: 30px;
    border-right: 0;
    border-bottom: 0.01em solid black;
    padding-bottom: 70px;
  }
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 30px;
  @media (max-width: 640px) {
    text-align: center;
    width: 100vw;
    font-size: 30px;
  }
`;

const ProductsList = styled.div`
  width: 28vw;
  margin-right: 10px;
  font-size: 30px;
  @media (max-width: 640px) {
    padding: 10px;
    text-align: center;
    width: 100vw;
    font-size: 20px;
  }
`;

const OrderResume = styled.div`
  padding-left: 150px;
  padding-top: 50px;
  justify-content: space-evenly;
  font-size: 30px;
  padding-top: 50px;

  .title {
    font-weight: bold;
    margin-top: 20px;
  }

  @media (max-width: 640px) {
    padding-left: 0px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const TotalWrapper = styled.div`
  line-height: 2;

  .total-title {
    font-weight: bold;
  }
  .total-price {
    @media (max-width: 640px) {
      font-size: 20px;
      padding-right: 5px;
    }
  }
  @media (max-width: 640px) {
    font-size: 25px;
  }
`;

const CloseOrder = styled.button`
  margin-left: 30px;
  margin-top: 50px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  padding: 20px;
  border: none;
  background-color: #b3e283;
  @media (max-width: 640px) {
    width: 200px;
    padding: 10px;
    margin-left: 20px;
  }
  @media (max-width: 320px) {
    margin-left: 20px;
  }
`;

const GoBack = styled.button`
  margin-left: 60px;
  margin-top: 50px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  padding: 20px;
  border: none;
  background-color: #f3c583;
  @media (max-width: 640px) {
    margin-left: 20px;
    width: 200px;
    padding: 10px;
  }
  @media (max-width: 320px) {
    margin-left: 20px;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  img {
    width: 120px;
    height: 50px;
    @media (max-width: 640px) {
      width: 80px;
      height: 35px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;
