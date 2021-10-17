import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertDocument = payload => api.post(`/document`, payload)

const apis = {
    insertDocument
}

export default apis
