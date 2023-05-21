import axiosClient from "../axios.js";

export function sendData(data){
    return axiosClient.post('/order', data);
}
