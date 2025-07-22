import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3000/api/';

export const fetchGames = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}games/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}token/`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}register/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }

    
};

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

