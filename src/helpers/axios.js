import axios from "axios";
import { apiURL } from "../urlConfig";

const axiosInstance = axios.create({
    baseURL: apiURL,
    // headers: {
    //     'Authorization': ''
    // }
});

export default axiosInstance;
