import axios from "axios";
import {BASE_URL} from "../config"


const instance = axios.create({
    headers:{'X-Custom-Header': 'foobar'},
    baseURL: BASE_URL,
    chunkOrigins: true,
});

export default instance;