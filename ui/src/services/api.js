import axios from 'axios';

const api = axios.create({ baseUrl: "ec2-18-216-123-251.us-east-2.compute.amazonaws.com/api"});

export default api;