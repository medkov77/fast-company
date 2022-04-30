import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Users from "./layout/users";
import api from "../api";
import User from "./user";
const UsersList = () => {
    const params = useParams();
    const { userId } = params;
    if (userId) {
        const [user, setUser] = useState();
        useEffect(
            () => api.users.getById(userId).then((data) => setUser(data)),
            []
        );

        return user ? <User user={user} /> : <h1>Loading</h1>;
    }
    return <Users />;
};
export default UsersList;
