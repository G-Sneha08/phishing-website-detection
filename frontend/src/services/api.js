import axios from 'axios';

const API_URL = ''; // Use Vite proxy in development

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const scanUrl = async (url) => {
    const response = await api.post('/scan', { url });
    return response.data;
};

export const predictUrl = async (url) => {
    const response = await api.post('/predict', { url });
    return response.data;
};

export const getHistory = async () => {
    const response = await api.get('/history');
    return response.data;
};

export const getAnalytics = async () => {
    const response = await api.get('/analytics');
    return response.data;
};

export const trainModel = async () => {
    const response = await api.post('/train');
    return response.data;
};

export const uploadDataset = async (formData) => {
    const response = await api.post('/upload_dataset', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export default api;
