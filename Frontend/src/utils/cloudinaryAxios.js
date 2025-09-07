import axios from 'axios';

const cloudinaryAxios = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/dfecczhpy',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: false,
});

export default cloudinaryAxios;
