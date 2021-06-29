import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserContext from "./context/UserContext";
import "./styles/reset.css";

export default function App() {
  const userSerializado = localStorage.getItem("user");
  const [userInformation, setUserInformation] = useState(JSON.parse(userSerializado));
  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={{ userInformation, setUserInformation }}>
          <Route path="/" component={SignIn} exact />
          <Route path="/sign-up" component={SignUp} exact />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
