import axios from 'axios';

const BASE_URL = 'https://66fce9bac3a184a84d185a08.mockapi.io/api/v1';

const axiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};

export const API = axiosInstance();
