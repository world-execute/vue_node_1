import axios from "axios";

const mockHttp = axios.create({
    baseURL:'http://127.0.0.1:4523/m1/1659668-0-default'
})

export default mockHttp
