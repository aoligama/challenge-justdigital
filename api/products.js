import axios from 'axios'

const API_URL = process.env.NUXT_ENV_API_PRODUCTS

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: API_URL
})

export default api
