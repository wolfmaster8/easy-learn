import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3280/api'});

export default api;