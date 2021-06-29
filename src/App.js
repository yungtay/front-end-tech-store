import ProductPage from "./components/ProductPage";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import UserContext from "./context/UserContext";

export default function App() {

    const [userData, setUserData] = useState("");
  
    return (    
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Switch>
            <Route path="/product/:id" exact>   
                <ProductPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }