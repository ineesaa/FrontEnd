import axios from 'axios'

export const Http = axios.create({
  baseURL: 'http://localhost:4002',
})

Http.interceptors.request.use((request) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})