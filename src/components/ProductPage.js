import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

export default function ProductPage() {

    const [counter, setCounter] = useState(1);

    function changeCounter(e, operator) {
        e.stopPropagation();
        let control = false;
    
        if (operator === "-") {
          counter > 1 ? setCounter(counter - 1) : setCounter(1);
        } else {
          setCounter(counter + 1);
          control = true;
        }
    }

    function addToCart() {
        
    }


    return (
        <Container>
            <Wrapper>                
                  <img src="https://ae01.alicdn.com/kf/H5ed8ba0f675945069fe7dd458fc4717dr.jpg" alt="usb cable" />                                  
                <Info>
                    <div className="title"> Cabo USB 3.0 </div>
                    <div className="price">R$50,00</div> 
                    <div className="price-card">5x de R$10,00 sem juros</div>  
                    <div className="shipping">Envio de: RJ - Brasil</div>  
                    <div className="title-quantity">Quantidade:</div>                  
                    <div className="wrap-counter">
                                        
                        <button
                            onClick={(e) => changeCounter(e, "-")}
                            className="counter-left"
                        >
                            -
                        </button>
                        <div className="text-counter">{counter}</div>
                        <button
                            onClick={(e) => changeCounter(e, "+")}
                            className="counter-right"
                        >
                            +
                        </button>
                       
                    </div>
                    <div className="quantity-available-items">86475 itens disponíveis</div>
                    <AddToCart onClick={addToCart}> Adicionar ao carrinho </AddToCart>             
                </Info> 
               
                <Description>
                <HorizontalLine></HorizontalLine>
                    <div className="title">Descrição</div>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Description>                           
            </Wrapper>                       
        </Container>
    )
}

const Container = styled.div`
    background-color: #fff;  
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway', sans-serif;
    max-width: 100vw;   
`;

const Wrapper = styled.div`    
    display: flex;   
    padding: 200px;  
    flex-wrap: wrap;
    justify-content: space-evenly;
   

    img {
        width: 450px;
        height: 500px;
    }
`;


const Info = styled.div`      
    padding-left: 250px;
    border-left: 3px solid #F3C583;

    .title {
        font-size: 50px;  
        font-weight: bold;
    }

    .price {
        font-size: 30px;
        margin-top: 20px;
    }

    .price-card, .shipping {
        font-size: 20px;
        margin-top: 20px;
    }

    .title-quantity {
        margin-top: 80px;
        font-size: 25px;
    }

    .quantity-available-items{
        padding-top: 20px;
        color: gray;
    }

    .wrap-counter {
        margin-top: 10px;
        font-size: 20px;
        display:flex;
        

        .counter-left, .counter-right {
            background-color: #B3E283;
            border-radius: 15px;
            border: none;
            cursor: pointer;
            width: 30px;
            height: 30px;            
            font-size: 25px;
        }

        .counter-left {
            margin-right: 10px;
        }

        .counter-right {
            margin-left: 10px;
        }      

        .text-counter {
            font-size: 25px;
        }
    }
`;

const AddToCart = styled.button`
    margin-top: 80px;
    font-size: 20px;
    border-radius: 5px;   
    cursor: pointer; 
    width: 300px;   
    padding: 20px;
    border: none;
    background-color: #B3E283;
`;

const HorizontalLine = styled.div`
    height: 3px;
    background-color: #F3C583; 
    margin-top: 45px;   
`;

const Description = styled.div`   
    width: 100%;
    line-height: 2em;
   
    .title {
        margin-top: 30px;
        margin-bottom: 15px;
        font-size: 40px;
    }
`;





