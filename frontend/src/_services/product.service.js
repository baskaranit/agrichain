import { fetchWrapper } from '../_helpers';

const baseUrl = 'http://127.0.0.1:5000/product';

export const productService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    checkout
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function checkout(params) {
    return fetchWrapper.post(baseUrl+'/checkout', params);
}
