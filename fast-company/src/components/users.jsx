import React, { useState } from "react";
import api from "../api";
const Users = () => {
  function renderPhrase(n) {
    if (n < 2 || (n >= 5 && n <= 21)) {
      return "человек тусанет";
    }
    if (n > 1 && n < 5) {
      return "человека тусанут";
    }
    let nLast = Number(String(n).slice(-1));
    if (nLast > 1 && nLast < 5) {
      return "человека тусанут";
    }

    return "человек тусанет";
  }

  const usersDataSource = api.users.fetchAll();
  const [usersData, setUserData] = useState(usersDataSource);

  function handleDelite(id) {
    setUserData((prevState) => prevState.filter((user) => user._id !== id));
  }

  return (
    <div div className="container">
      {usersData.length !== 0 ? (
        <div>
          <h3>
            <span className="mt-2 badge bg-primary">
              {usersData.length} {renderPhrase(usersData.length)} с тобой
              сегодня{" "}
            </span>
          </h3>
          <table className="table">
            <thead className="mb-2">
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="mt-2 pt-2">
              {usersData.map((user) => {
                return (
                  <tr scope="col" key={user._id} className="align-middle">
                    <td>{user.name}</td>
                    <td>
                      {user.qualities.map((qualiti) => {
                        return (
                          <span
                            className={`m-2 p-2 badge bg-${qualiti.color}`}
                            key={qualiti._id}
                          >
                            {qualiti.name}
                          </span>
                        );
                      })}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger bg-red"
                        onClick={() => handleDelite(user._id)}
                      >
                        delite
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>
          <span className="mt-2 badge bg-danger">
            никто не тусанет с тобой сегодня
          </span>
        </h3>
      )}
    </div>
  );
};

export default Users;
