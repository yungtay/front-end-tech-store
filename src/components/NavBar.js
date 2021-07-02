import styled from "styled-components";
import { CartOutline, LogInOutline } from "react-ionicons";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import Modal from "react-modal";
import LogOut from './LogOut'

export default function NavBar() {
  const { cart, userInformation, setUserInformation } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${userInformation}` },
    };

    if (!search) return;
    const request = axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/product?name=${search}`,
        config
      )
      .then((resp) => setProducts(resp.data))
      .catch((e) => {
        console.log(e);
        alert(
          "Ocorreu um erro ao obter as informações do produto, tente novamente"
        );
      });
  }, [search]);
  return (
    <>
      <ContainerNavBar>
        <Logo>TECHSTORE</Logo>
        <CartMobile>
          <Link to="/shopcart">
            <CartOutline
              color={"#00000"}
              title="cart"
              height="45px"
              width="45px"
            />
            <NumberCart>{cart.length > 10 ? "10+" : cart.length}</NumberCart>
          </Link>
        </CartMobile>
        <ContainerInput>
          <ReactSearchAutocomplete
            items={products}
            onSearch={(string) => {
              setSearch(string);
            }}
            onSelect={(item) => {
              history.push(`/product/${item.id}`);
            }}
            placeholder={
              window.innerWidth > 1200
                ? "Procure aqui o seu produto"
                : "Procure aqui"
            }
            styling={{
              borderRadius: "5px",
              fontFamily: "Raleway",
              boxShadow: "rgba(32, 33, 36, 0.28) 0px 0px 0px 0px",
            }}
            showIcon={false}
          />
        </ContainerInput>

        <ContainerCartAndLogout>
          <ContainerCart>
            <Link to="/shopcart">
              <CartOutline
                color={"#00000"}
                title="cart"
                height="45px"
                width="45px"
              />
              <NumberCart>{cart.length > 10 ? "10+" : cart.length}</NumberCart>
            </Link>
          </ContainerCart>
          <LogInOutline
            color={"#00000"}
            title="logout"
            height="45px"
            width="45px"
            onClick={() => setIsOpen(true)}
          />
        </ContainerCartAndLogout>
      </ContainerNavBar>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          content: {
            top: "25%",
            left: "12.5%",
            right: "12.5%",
            bottom: "35%",
            border: "10px solid #ccc",
            borderRadius: "50px",
            padding: "20px",
          },
        }}
      >
        <ModalDialog>
          <div>Você deseja deslogar ?</div>
          <div>
            <button onClick={(e) => LogOut(userInformation, setUserInformation, history,)}>Deslogar</button>
            <button onClick={() => setIsOpen(false)}>Cancelar</button>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
}

const ContainerNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background: #e8e46e;
`;

const Logo = styled.div`
  color: #f3c583;
  font-size: 52px;
  font-family: "Saira Stencil One", cursive;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const ContainerCartAndLogout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContainerCart = styled.div`
  position: relative;
  z-index: 10;
  margin-right: 25px;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const NumberCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30px;
  height: 30px;
  top: -17px;
  right: 0px;
  background: red;
  color: white;
  border-radius: 100%;
  z-index: 1;
  font-size: 18px;
  padding: 5px;

  z-index: -1;
`;

const ContainerInput = styled.div`
  width: 50%;
  margin: 0 15px;
  font-size: 20px;
`;

const CartMobile = styled.div`
  display: none;
  position: relative;
  z-index: 10;
  @media (max-width: 1200px) {
    display: initial;
  }
`;

const ModalDialog = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
    font-size: 28px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-evenly;
    @media (max-width: 1200px) {
      font-size: 24px;
    }
    @media (max-width: 800px) {
      font-size: 20px;
    }
  }

  button {
    width: 30%;
    height: 40px;
    border-radius: 50px;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement(".root");
