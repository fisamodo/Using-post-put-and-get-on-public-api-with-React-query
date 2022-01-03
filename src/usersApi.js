import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gorest.co.in/public/v1',
    headers: {
        Authorization: 'Bearer 6c029e138cea8cc0698d4153740e4fe943df7eb1141e0ccc6fde67acd6e65041'
    }
});

export const getUsers = () => api.get('/users').then(res => res.data);

export const getUser = (id) =>
    api.get(`/users/${id}`).then((res) => res.data);

export const updateUser = ({id, ...updateUser}) =>
    api.put(`/users/${id}`, updateUser).then((res) => res.data);
