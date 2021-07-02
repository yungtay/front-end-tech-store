import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProductPage from "./components/ProductPage";
import UserContext from "./context/UserContext";
import ShopcartPage from "./components/ShopcartPage";
import CheckoutPage from "./components/CheckoutPage";
import Home from "./components/Home"
import "./styles/reset.css";

export default function App() {
  const userSerializado = localStorage.getItem("user");
  const [userInformation, setUserInformation] = useState(JSON.parse(userSerializado));
  

  const [cart, setCart] = useState([
         
  ]);

  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={{ cart, setCart, userInformation, setUserInformation }}>
          <Route path="/" component={SignIn} exact />
          <Route path="/sign-up" component={SignUp} exact />
          <Route path="/product/:id" exact>
            <ProductPage/>
          </Route>
          <Route path="/shopcart" exact>
            <ShopcartPage/>
          </Route>
          <Route path="/checkout" exact>
            <CheckoutPage/>
          </Route>
          <Route path="/home" component={Home} exact />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
