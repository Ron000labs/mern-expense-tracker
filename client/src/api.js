
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v2';

const API = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

export const fetchExpenses = async () => {
    const response = await API.get('/expenses');
    return response.data.data;
};

export const createExpense = async (payload) => {
    const response = await API.post('/expenses', payload);
    return response.data.data;
};

export const updateExpense = async (id, payload) => {
    const response = await API.put(`/expenses/${id}`, payload);
    return response.data.data;
};

export const deleteExpense = async (id) => {
    const response = await API.delete(`/expenses/${id}`);
    return response.data;
};
