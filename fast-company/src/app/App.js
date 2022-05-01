import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
// import Users from "./components/users";
import Main from "./components/layout/main";
import Login from "./components/layout/login";
import NavBar from "./components/navbar";
import UsersList from "./components/usersList";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login} />
                <Route path="/users/:userId?" component={UsersList} />
                <Redirect path="/" />
            </BrowserRouter>
        </div>
    );
}

export default App;
