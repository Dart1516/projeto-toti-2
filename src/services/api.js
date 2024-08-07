import axios from 'axios'

export const Api = axios.create({
    baseURL : "https://api-rs-pquf.onrender.com/"
})