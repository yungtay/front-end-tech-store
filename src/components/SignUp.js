import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Title, Form } from "./SignIn";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [signUp, setSignUp] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    for (const keys in signUp) {
      if (!signUp[keys]) {
        setIsLoading(false);
        alert(
          `Por favor, preencha o campo: ${
            keys === "email"
              ? "E-mail"
              : keys === "name"
              ? "Nome"
              : keys === "password"
              ? "Senha"
              : "Confirmar Senha"
          }`
        );
        return;
      }
      if (signUp.confirmPassword !== signUp.password) {
        setIsLoading(false);
        alert(`A senha é diferente no campo de confirmação, tente novamente`);
        setSignUp({ ...signUp, password: "", confirmPassword: "" });
        return;
      }
    }
    const { confirmPassword, ...userInformation } = signUp;
    const request = axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`, userInformation)
      .then(submitSucess)
      .catch(submitFail);
  }

  function submitSucess(response) {
    setIsLoading(false);
    setSignUp({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    history.push("/");
  }

  function submitFail(error) {
    setIsLoading(false);
    setSignUp({
      ...signUp,
      password: "",
      confirmPassword: "",
    });
    if (error?.response?.status === 409) {
      alert("O e-mail inserido já está em uso");
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
          value={signUp.email}
          onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
        />
        <input
          disabled={isLoading}
          type="text"
          placeholder="Nome"
          minLength="3"
          maxLength="30"
          value={signUp.name}
          onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
        />
        <input
          disabled={isLoading}
          type="password"
          placeholder="Senha"
          minLength="6"
          maxLength="30"
          value={signUp.password}
          onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
        />
        <input
          disabled={isLoading}
          type="password"
          placeholder="Confirmar Senha"
          minLength="6"
          maxLength="30"
          value={signUp.confirmPassword}
          onChange={(e) =>
            setSignUp({ ...signUp, confirmPassword: e.target.value })
          }
        />
        <button type="submit">
          {isLoading ? (
            <Loader type="ThreeDots" color="white" height={20} />
          ) : (
            "Cadastrar"
          )}
        </button>
        <Link to="/">Já possui uma conta? Entre aqui!</Link>
      </Form>
    </>
  );
}
