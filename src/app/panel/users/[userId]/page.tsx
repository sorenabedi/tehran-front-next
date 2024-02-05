import UserUpdateView from "@/views/usersUpdate";
import React, { FunctionComponent } from "react";

const UserUpdatePage: FunctionComponent = ({}) => {
  return (
    <>
      <UserUpdateView />
    </>
  );
};
UserUpdatePage.displayName = "UserUpdatePage";

export default UserUpdatePage;
