import axios from 'axios';
require('dotenv').config();

const api = axios.create({ baseURL: process.env.REACT_APP_DB_HOST || 'http://localhost:3280/api'});

export default api;