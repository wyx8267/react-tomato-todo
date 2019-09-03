import axios from 'axios'

const appId = 'nnisJpYRKhMVWLpTdNxf8UnN'
const appSecret = '89VekUFZPK2CWpHRGpCHGgvb'

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appId,
        't-app-secret': appSecret
    }
})

instance.interceptors.request.use((config) => {
    const xToken = localStorage.getItem('x-token')
    if (xToken) {
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config
}, (error) => {
    console.error(error)
    return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
    if (response.headers['x-token']) {
        localStorage.setItem('x-token', response.headers['x-token'])
    }
    return response
}, (error) => {
    console.error(error)
    return Promise.reject(error)
})

export default instance