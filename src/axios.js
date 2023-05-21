import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api'
});

axiosClient.interceptors.response.use(response =>{
    return response;
}, error => {
    console.error(error);
    throw error;
})

export default axiosClient;
