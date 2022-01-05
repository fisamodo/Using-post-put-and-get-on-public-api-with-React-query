import * as api from "./usersApi";

import React, { FC } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useForm } from "react-hook-form";
import { useState } from "react";

export const UserForm: FC<any> = ({
  user,
  setIsEditing,
}: {
  user: any;
  setIsEditing: any;
}) => {
  const [fields, setFields] = useState({ ...user });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(api.updateUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(["users", user.id], data);
      setIsEditing(false);
    },
  });
  //   const { mutate } = useMutation(api.updateUser);

  const onSubmit = (data: any) => {
    console.log(data);
    const newField = { ...fields, ...data };
    setFields(newField);
    mutate(newField, data);
  };

  if (isLoading) {
    return <>'Saving your changes'</>;
  }

  return (
    <div style={{ paddingTop: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label> Name: </label>
        {errors.name && "Name is required"}

        <input
          type="text"
          defaultValue={fields.name}
          style={{ width: "100%", marginBottom: 20 }}
          {...register("name", { required: true, minLength: 2 })}
        />

        <label> Details: </label>
        {errors.email && "Name is required"}

        <input
          type="text"
          defaultValue={fields.email}
          style={{ width: "100%", height: 200 }}
          {...register("email", { required: true })}
        />

        <button type="submit" value="Submit" onClick={handleSubmit(onSubmit)}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserForm;
