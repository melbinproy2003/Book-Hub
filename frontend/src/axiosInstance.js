import axios from 'axios';

const token = localStorage.getItem('token'); // Retrieve token from local storage

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
    },
});

export default axiosInstance;
