import axios from 'axios'

export const Api = axios.create({
    baseURL : "https://api-rs-pquf.onrender.com/"
})

export const ApiBrasil = axios.create({
    baseURL : "https://brasilapi.com.br/api/cep/v2"
})