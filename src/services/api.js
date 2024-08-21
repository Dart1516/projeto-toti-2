import axios from 'axios'

export const Api = axios.create({
    baseURL : "http://localhost:2500"
})

export const ApiBrasil = axios.create({
    baseURL : "https://brasilapi.com.br/api/cep/v2"
})