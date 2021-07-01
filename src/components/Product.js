import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

export default function Product({ item }) {
     
    return (
        <Container>
            <Title>{item.name} Quantidade: ({item.quantity}) </Title>                                       
            <br />   
            <Price>
            Preço unitário: R${(item.price/100).toFixed(2).replace(".",",").replace("-","")}
            </Price>         
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: wrap;
`;

const Title = styled.div`
    margin-bottom: 20px;
    font-size: 25px;

    @media (max-width: 640px) {           
       font-size: 15px;    
    }
`;

const Price = styled.div`
    font-size: 25px;

    @media (max-width: 640px) {           
       font-size: 15px;    
    }
`;