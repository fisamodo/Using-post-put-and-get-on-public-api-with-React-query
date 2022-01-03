import * as api from './usersApi'

import React, {useState} from 'react'

import UserForm from './UserForm'
import { useQuery } from 'react-query'

const UserDetails = ({userId}) => {
    const [isEditing, setIsEditing] = useState(false)
    const { data: user, isLoading, isFetching } = useQuery(['users', userId], () => 
    api.getUser(userId), {
        enabled: Boolean(userId)
    });
    
    if(!userId) {
        return 'Select a user.'
    }

    if(isLoading) {
        return 'Loading user data'
    }
    
    return (
        <div>
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'CANCEL' : 'EDIT'}
            </button>
            {isEditing ? (<UserForm user={user.data}  setIsEditing={setIsEditing}/> ):(
                <div>
                    <h2>{user.data.name}</h2>
                    <p>{user.data.email}
            </p>
                    
            </div>
            ) }
            
        </div>
    )
}

export default UserDetails
