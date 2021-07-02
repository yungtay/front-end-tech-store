import axios from "axios";

export default function LogOut(token, setUserInformation, history) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const request = axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/logout`,{}, config)
    .then(() => {
      localStorage.removeItem("user");
      setUserInformation(null)
      history.push("/")
    })
    .catch(() => {
      alert("Ocorreu um erro ao deslogar, tente novamente");
    });
}
