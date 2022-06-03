import React, { useState, useContext } from "react";
import ProptyTypes from "prop-types";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UseProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    return <UserContext.Provider>{children}</UserContext.Provider>;
};

UseProvider.propTypes = {
    children: ProptyTypes.oneOfType([
        ProptyTypes.arrayOf(ProptyTypes.node),
        ProptyTypes.node
    ])
};
export default UseProvider;
