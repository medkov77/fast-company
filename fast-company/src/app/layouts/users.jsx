import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditForm from "../components/ui/userEditForm";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    const { edit } = params;
    return (
        <>
            {userId ? (
                edit === "edit" ? (
                    <UserEditForm userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
