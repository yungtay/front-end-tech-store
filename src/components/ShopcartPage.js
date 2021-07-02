import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Product from "./Product";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./NavBar"

export default function ShopcartPage() { 
    const { userInformation, cart, setCart } = useContext(UserContext); 
    const [totalPrice, setTotalPrice] = useState(0); 
    const history = useHistory();

    useEffect(() => 
        {setTotalPrice(cart.reduce((t, p) => t+(p.price*p.quantity),0))
    }, []);
   
    return (
        <Container>
            <NavBar/>  
            <Wrapper>          
                <Title>Carrinho ({cart.length})</Title>            
                <ProductsList>  
                    {cart.length === 0 ? "Seu carrinho de compras está vazio!" :                  
                    cart.map((item, i) =>          
                        <Product key={i} setTotalPrice={setTotalPrice} totalPrice={totalPrice} item={item}/>                   
                    ) 
                }         
                </ProductsList>                             
            </Wrapper>
            <OrderResume>
                <Title>Resumo do pedido</Title>  
                <TotalWrapper>
                    <div className="total-title">Total:</div> 
                    <div className="total-price">R$ {(totalPrice/100).toFixed(2).replace(".",",").replace("-","")}</div>
                </TotalWrapper>
                
                    <CloseOrder onClick={() => history.push("/checkout")}>Fechar pedido</CloseOrder>
                
                <Link to="/home"> 
                    <GoBack>Voltar para home</GoBack>                      
                </Link> 
            </OrderResume>        
        </Container>
    )
};


const Container = styled.div`
    background-color: #fff;  
    display: flex;    
    font-family: 'Raleway', sans-serif;
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
    margin-top: 150px;

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
    padding-left: 50px; 
    padding-top: 190px;    
    justify-content: space-evenly;  
    font-size: 30px; 
    

    @media (max-width: 640px) {
       padding-left: 0px;  
       font-size: 20px;  
       display: flex;
       flex-direction: column ;
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
    margin-left: 20px;
    margin-top: 50px;  
    font-size: 20px;
    border-radius: 5px;   
    cursor: pointer; 
    width: 300px;   
    padding: 20px;
    border: none;
    background-color: #B3E283;

    @media (max-width: 640px) {           
        width: 200px;    
    }
`;

const GoBack = styled.button`  
    margin-left: 20px;
    margin-top: 50px;  
    font-size: 20px;
    border-radius: 5px;   
    cursor: pointer; 
    width: 300px;   
    padding: 20px;
    border: none;
    background-color: #F3C583;

    @media (max-width: 640px) {  
             
       width: 200px;    
    }
`;





