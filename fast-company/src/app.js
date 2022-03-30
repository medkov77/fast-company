import React from "react";
import Users from "./components/users";
import api from "./api";
import { useState } from "react";

const App = () => {
  const usersDataSource = api.users.fetchAll();
  const [usersData, setUserData] = useState(usersDataSource);
  function handleDelite(id) {
    setUserData((prevState) => prevState.filter((user) => user._id !== id));
  }
  return (
    <div className="container">
      <Users usersData={usersData} onDelite={handleDelite} />
    </div>
  );
};

export default App;
