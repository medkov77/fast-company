import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Users from "./components/users";
import Main from "./components/layout/main";
import Login from "./components/layout/login";
import NavBar from "./components/navbar";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login} />
                <Route path="/users" component={Users} />
            </BrowserRouter>
        </div>
    );
}

export default App;
