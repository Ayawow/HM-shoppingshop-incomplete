/* 封装axios用于发送请求 */
import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

// 创建一个新的axios实例
const request = axios.create({
    baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
    timeout: 3000,
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
    })

    const token = store.getters.token
    if (token) {
        config.headers['Access-Token'] = token
        config.headers.platform = 'H5'
    }

    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    const res = response.data
    if (res.status !== 200) {
        Toast(res.message)
        return Promise.reject(res.message)
    }
    else {
        Toast.clear()
    }
    // 对响应数据做点什么
    return res
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})
export default request