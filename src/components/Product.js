import styled from "styled-components";

export default function Product({ item }) {
     
    return (
        <Container>
            <Title>{item.name} Quantidade: ({item.quantity}) <br/>Preço unitário: R${(item.price/100).toFixed(2).replace(".",",").replace("-","")} </Title>                                       
            <br />                    
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: wrap;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    margin-bottom: 20px;
    font-size: 25px;

    @media (max-width: 640px) {           
       font-size: 15px;    
    }
`;

