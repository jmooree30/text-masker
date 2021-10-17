import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertDocument = payload => api.post(`/document`, payload)
export const maskDocument = payload => api.post(`/maskDocument`, payload)

const apis = {
    insertDocument,
    maskDocument
}

export default apis
