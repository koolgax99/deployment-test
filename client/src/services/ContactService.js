import axios from 'axios';

const getAll = () => {
    return axios.get("/api/contacts");
};

const get = id => {
    return axios.get(`/api/contacts/${id}`);
};

const create = data => {
    return axios.post("/api/contacts", data);
};

const update = (id, data) => {
    return axios.put(`/api/contacts/${id}`, data);
};

const remove = id => {
    return axios.delete(`/api/contacts/${id}`);
};

const removeAll = () => {
    return axios.delete(`/api/contacts`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
};