import * as api from './usersApi'

import React, {useEffect, useState} from 'react'
import { UseQuery, useQuery } from 'react-query'

export const Users = ({ setUserId}) => {
    const { data, isLoading, isError, error } = useQuery('users', api.getUsers)

    if ( isLoading) {
        return 'Loading users...'
    }

    if(isError) {
        return 'Something went wrong'
    }

    return (
        <div>
            <ul>{data["data"]?.map(user => <li key={user.id}>
                {user.name} <button onClick={() => setUserId(user.id)}>View</button>
                </li>)}</ul>
        </div>
    )
}

export default Users;