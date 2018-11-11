import axios from 'axios';

const api = axios.create({ baseURL: 'http://apieasylearn.sierra9.com/api'});

export default api;