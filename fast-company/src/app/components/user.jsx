import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useHistory } from "react-router-dom";
const User = ({ user }) => {
    const history = useHistory();
    const handleAllUsers = () => {
        history.push("/users");
    };
    return (
        <div key={user._id} className="p-5">
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <div>
                {user.qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </div>
            <td>Встретился, раз {user.completedMeetings}</td>
            <h2>Rate: {user.rate} /5</h2>
            <td>
                <button className="btn btn-success" onClick={handleAllUsers}>
                    Все пользователи
                </button>
            </td>
        </div>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired
};

export default User;
