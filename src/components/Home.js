import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <Product>oi</Product>
      <Product>oi</Product>
      <Product>oi</Product>
      <Product>oi</Product>
      <Product>oi</Product>
      <Product>oi</Product>
      <Product>oi</Product>
      <Product>oi</Product>
      <Product>oi</Product>
      <Product>oi</Product>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 200px;
  padding: 0px 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, calc((100% / 4) - 2%));
  grid-column-gap: calc((2% * 4) / 3);
  grid-row-gap: 2vh;
  justify-content: center;
`;

const Product = styled.div`
  height: 420px;
  display: flex;
  justify-content: center;
  background: white;
  padding: 10%10%;

`;
