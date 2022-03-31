import React from "react";
import Users from "./components/users";
import api from "./api";
import { useState } from "react";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const usersDataSource = api.users.fetchAll();
  const [usersData, setUserData] = useState(usersDataSource);
    
  function handleDelite(id) {
    setUserData((prevState) => prevState.filter((user) => user._id !== id));
  }
  
  function handleToggleBookMark (id){
    console.log (id); 
    setUserData(
       usersData.map ((user)=>{
         if (user._id === id){
           user.bookmark = !user.bookmark;
         }
         return user
       })
     )
  }
  
  return (
    <div className="container">
      <SearchStatus usersNumber = {usersData.length}/>
      <Users usersData={usersData} onDelite={handleDelite} onToggleBookMark = {handleToggleBookMark} />
    </div>
  );
};

export default App;
