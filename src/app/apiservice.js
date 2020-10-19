import axios from 'axios'
import { getToken } from "./service/auth";

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

class ApiService {

    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto);
    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto);
    }

    get(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl);
    }

}

export default ApiService;