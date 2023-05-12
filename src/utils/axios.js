import axios from "axios";
import {API_SERVER} from "../config/constant";


const axiosInstance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const axiosWrapper = (method, url, data, successAction, errorAction) => {
    axiosInstance({
        method: method,
        url: url,
        data: data
    }).then((response) => {
        if (response.status === 200)
            successAction(response.data);
        else if (errorAction)
            errorAction(response.data);
    });
};


export default axiosWrapper;