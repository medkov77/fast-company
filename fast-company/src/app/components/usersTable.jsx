import React from "react";
import PropTypes from "prop-types";
import User from "./user";
const UsersTable = ({ users, onSort, curentSort, ...rest }) => {
    const handleSort = (item) => {
        if (curentSort.iter === item) {
            onSort({
                ...curentSort,
                order: curentSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <table className="table">
            <thead>
                <tr>
                    <th
                        onClick={() => {
                            handleSort("name");
                        }}
                        scope="col"
                    >
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th
                        onClick={() => {
                            handleSort("profession.name");
                        }}
                        scope="col"
                    >
                        Профессия
                    </th>
                    <th
                        onClick={() => {
                            handleSort("completedMeetings");
                        }}
                        scope="col"
                    >
                        Встретился, раз
                    </th>
                    <th
                        onClick={() => {
                            handleSort("rate");
                        }}
                        scope="col"
                    >
                        Оценка
                    </th>
                    <th
                        onClick={() => {
                            handleSort("bookMark");
                        }}
                        scope="col"
                    >
                        Избранное
                    </th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User {...rest} {...user} key={user._id} />
                ))}
            </tbody>
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    curentSort: PropTypes.object.isRequired
};
export default UsersTable;
