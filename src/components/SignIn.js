import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../context/UserContext";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { userInformation, setUserInformation } = useContext(UserContext);
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  if (userInformation !== null) {history.push("/home");} 

  function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    for (const keys in signIn) {
      if (!signIn[keys]) {
        alert(
          `É necessário preencher o campo ${
            keys === "email" ? "E-mail" : "Senha"
          }`
        );
        setIsLoading(false);
        return;
      }
    }
    const request = axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/sign-in`, signIn)
      .then(submitSucess)
      .catch(submitFail);
  }

  function submitSucess(response) {
    setIsLoading(false);
    setSignIn({ email: "", password: "" });
    setUserInformation(response.data)
    const userSerializados = JSON.stringify(response.data);
    localStorage.setItem("user", userSerializados);
    history.push("/home");
  }

  function submitFail(error) {
    setIsLoading(false);
    setSignIn({ ...signIn, password: "" });
    if (error?.response?.status === 401) {
      alert("E-mail ou senha incorretos");
    } else {
      alert("Um erro desconhecido ocorreu");
    }
  }

  return (
    <>
      <Title>Tech-Store</Title>
      <Form onSubmit={submit} loading={isLoading ? "loading" : ""}>
        <input
          disabled={isLoading}
          type="email"
          placeholder="E-mail"
          minLength="3"
          maxLength="30"
          value={signIn.email}
          onChange={(e) => setSignIn({ ...signIn, email: e.target.value })}
        />
        <input
          disabled={isLoading}
          type="password"
          placeholder="Senha"
          minLength="6"
          maxLength="30"
          value={signIn.password}
          onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader type="ThreeDots" color="white" height={20} />
          ) : (
            "Entrar"
          )}
        </button>
        <Link to="/sign-up">Não tem uma conta? Cadastre-se aqui!</Link>
      </Form>
    </>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0 40px 0;

  color: #f3c583;
  font-size: 52px;
  font-family: "Saira Stencil One", cursive;
`;

const Form = styled.form`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;

  input,
  button {
    height: 58px;

    border: 0px solid;
    border-radius: 5px;
    padding: 0 0 0 15px;
    margin-bottom: 13px;

    font-size: 20px;
    opacity: ${(prop) => (prop.loading ? 0.35 : 1)};
    background: ${(prop) => (prop.loading ? "#F2F2F2" : "white")};
    pointer-events: ${(prop) => (prop.loading ? "none" : "initial")};

    &::placeholder {
      color: black;
    }
  }
  a {
    font-size: 15px;
    font-weight: 700;
    color: white;

    margin: auto;
  }
`;

export { Title, Form }
