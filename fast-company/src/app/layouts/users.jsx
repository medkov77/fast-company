import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import UsersTable from "../components/usersTable";
import SearchStatus from "../components/searchStatus";
import GroupList from "../components/groupList";
import api from "../api";
import _ from "lodash";
// import { findLastIndex } from "lodash";
const Users = () => {
    const [users, setUsers] = useState();
    useEffect(() => api.users.fetchAll().then((data) => setUsers(data)), []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const [serchData, setSerchData] = useState("");
    const handleSearch = ({ target }) => {
        setSerchData(target.value);
        console.log(serchData);
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        console.log(id);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;
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

    if (users) {
        let filtredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;
        filtredUsers = serchData
            ? users.filter((user) => user.name === serchData)
            : users;
        const count = filtredUsers.length;
        const sortUsers = _.orderBy(
            filtredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortUsers, currentPage, pageSize);
        const clearItem = () => {
            setSelectedProf();
        };
        return (
            <div className="container d-flex mt-2">
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

                <div className="d-flex flex-column ">
                    {professions && <SearchStatus length={count} />}
                    {count > 0 && (
                        <>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                className="d-block"
                                onChange={handleSearch}
                            />
                            <UsersTable
                                users={usersCrop}
                                onToggleBookMark={handleToggleBookMark}
                                onDelete={handleDelete}
                                onSort={handleSort}
                                selectedSort={sortBy}
                            />
                        </>
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
    }
    return (
        <div className="d-flex justify-content-center">
            <div className=" mt-5 m-auto badge bg-secondary fz-32 fs-1 ">
                Идет загрузка
            </div>
        </div>
    );
};

export default Users;
