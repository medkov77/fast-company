import React, { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../api/utils/paginate";
const Users = ({ usersData, ...rest }) => {
    const count = usersData.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const userCorp = paginate(usersData, currentPage, pageSize);
    return (
        <>
            {count > 0 && <table className="table">
                <thead className="mb-2">
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {userCorp.map((user) => {
                    return (
                        <User
                            key={user._id}
                            profession={user.profession}
                            qualities={user.qualities}
                            name={user.name}
                            rate={user.rate}
                            _id={user._id}
                            bookmark={user.bookmark}
                            {...rest}
                        />
                    );
                })}
            </table>}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage = {currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    usersData: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired
};
export default Users;
