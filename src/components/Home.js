import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Home() {
  const { userInformation } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${userInformation}` },
    };

    const request = axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/product`, config)
      .then((resp) => setProducts(resp.data))
      .catch(() => {
        alert(
          "Ocorreu um erro ao obter as informações do produto, tente novamente"
        );
      });
  }, []);

  return (
    <>
      <NavBar />
      <ContainerProducts>
        {products.map((product, index) => (
          <Link to={`/product/${product.id}`} key={index}>
            <Product>
              <Description>
                <ProductName>{product.name}</ProductName>
                <div>
                  <img src={product.image} alt={`${product.name}`} />
                </div>
                <div>
                  <div>
                    R$ {(product.price / 100).toFixed(2).replace(".", ",")}
                  </div>
                  <Quantity>{product.availableQuantity} em estoque</Quantity>
                </div>
              </Description>
            </Product>
          </Link>
        ))}
      </ContainerProducts>
    </>
  );
}

const ContainerProducts = styled.div`
  width: 100%;
  margin-top: 200px;
  padding: 0px 50px 100px 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-column-gap: calc((2% * 4) / 3);
  grid-row-gap: 4vh;
  justify-content: center;
`;

const Product = styled.div`
  height: 420px;
  width: 300px;
  background: white;
  padding: 10%;
  border: 5px solid #b3e283;
  border-radius: 5%;

  img {
    width: 100%;
    height: auto;
  }
`;

const Description = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
`;

const Quantity = styled.div`
  font-size: 14px;
  color: gray;
  font-weight: 600;
`;

const ProductName = styled.div`
  font-size: 23px;
`;
