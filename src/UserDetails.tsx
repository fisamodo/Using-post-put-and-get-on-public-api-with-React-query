import * as api from "./usersApi";

import React, { FC, useState } from "react";

import UserForm from "./UserForm";
import { useQuery } from "react-query";

export const UserDetails: FC<any> = (userId) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading } = useQuery(
    ["users", userId.userId],
    () => api.getUser(userId.userId),
    {
      enabled: Boolean(userId.userId),
    }
  );

  if (!userId.userId) {
    return <>'Select a user.'</>;
  }

  if (isLoading) {
    return <>'Loading user data'</>;
  }

  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "CANCEL" : "EDIT"}
      </button>
      {isEditing ? (
        <UserForm user={user?.data} setIsEditing={setIsEditing} />
      ) : (
        <div>
          <h2>{user?.data?.name}</h2>
          <p>{user?.data?.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
