import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import UsersTable from "./usersTable";
import SearchStatus from "./searchStatus";
import GroupList from "./groupList";
import api from "../api";
import _ from "lodash";
// import { findLastIndex } from "lodash";
const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const ProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const filtredUsers = selectedProf
        ? allUsers.filter((user) => user.profession._id === selectedProf._id)
        : allUsers;
    const count = filtredUsers.length;
    const sortUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortUsers, currentPage, pageSize);
    const clearItem = () => {
        setSelectedProf();
    };
    return (
        <div className="container d-flex mt-2">
            {!professions && (
                <div className="mt-5 m-auto badge bg-secondary fz-32 fs-1 ">
                    Идет загрузка
                </div>
            )}
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={ProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearItem}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column ">
                {professions && <SearchStatus length={count} />}
                {count > 0 && (
                    <UsersTable
                        users={usersCrop}
                        {...rest}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                )}
                <div>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
