import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import { toast } from "react-toast";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://securetoken.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProveder = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLosding] = useState(true);
    const history = useHistory();
    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async function singUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);

            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                complitetMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким e-mail уже существует"
                    };

                    throw errorObject;
                }
            }
        }
    }
    async function singIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                let errorObject = null;
                if (message === "EMAIL_NOT_FOUND") {
                    errorObject = {
                        email: "Пользователь с таким e-mail не зарегистрирован"
                    };
                }
                if (message === "INVALID_PASSWORD") {
                    errorObject = {
                        password: "Неправильный пароль"
                    };
                }
                throw errorObject;
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error;
        setError(message);
    }
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            console.log(content);
            setUser(content);
        } catch (error) {
            console.log(error);
            errorCatcher(error);
        } finally {
            setLosding(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else setLosding(false);
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider value={{ singUp, singIn, currentUser, logOut }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProveder.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProveder;
