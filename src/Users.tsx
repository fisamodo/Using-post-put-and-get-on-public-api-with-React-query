import * as api from "./usersApi";

import React, { FC } from "react";

import { useQuery } from "react-query";

interface UsersInputProps {
  setUserId: (id: any) => any;
}

export const Users: FC<UsersInputProps> = ({ setUserId }) => {
  const { data, isLoading, isError } = useQuery("users", api.getUsers);

  if (isLoading) {
    return <>'Loading users...'</>;
  }

  if (isError) {
    return <>'Something went wrong'</>;
  }

  return (
    <div>
      <ul>
        {data["data"]?.map((user: any) => (
          <li key={user.id}>
            {user.name} <button onClick={() => setUserId(user.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
