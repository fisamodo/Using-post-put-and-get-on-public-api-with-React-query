import * as api from './usersApi'

import { useMutation, useQueryClient } from 'react-query';

import React from 'react'
import {useState} from 'react'

const UserForm = ({user, setIsEditing}) => {
    const[fields, setFields] = useState({...user});

    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation(api.updateUser, {
        onSuccess: (data) => {
            queryClient.setQueryData(['users', user.id], data);
            setIsEditing(false);
        }
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFields({...fields, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(fields);
        mutate(fields);
    }

    if(isLoading) {
        return 'Saving your changes'
    }

    return (
        <div style = {{ paddingTop: 20}}>
            <form onSubmit={handleSubmit}>
                <label> Name:{' '}
                <input
                name="name"
                type="text"
                value={fields.name}
                onChange={handleChange}
                style={{width: '100%', marginBottom: 20}}
                /></label>
            </form>

            <label> Details:{' '}
                <input
                name="details"
                type="text"
                value={fields.email}
                onChange={handleChange}
                style={{width: '100%', height: 200}}
                /></label>

        <button type="submit" onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default UserForm
