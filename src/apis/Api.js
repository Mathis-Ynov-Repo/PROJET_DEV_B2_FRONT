import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:8001/api'
});

export default Api;