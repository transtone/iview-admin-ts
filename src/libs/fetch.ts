import Qs from 'qs'
import axios from 'axios'
import store from '@/store'
// import { cleartoken } from '@/utils'

import cfg from '@/config'
const baseURL =
  process.env.NODE_ENV === 'development' ? cfg.baseUrl.dev : cfg.baseUrl.pro

// 创建axios实例
const service = axios.create({
  baseURL, // api的base_url
  timeout: 15000, // 请求超时时间
  transformRequest: [
    (data: any) => {
      data = Qs.stringify(data, { arrayFormat: 'repeat' })
      return data
    }
  ],
  transformResponse: [
    (data: any) => {
      try {
        if (data.length > 0) {
          data = JSON.parse(data)
        }
        return data
      } catch (err) {
        console.log(err)
        return data
      }
    }
  ]
})

// request拦截器
service.interceptors.request.use(
  (config: any) => {
    const token = store.getters.getterUserToken
    if (token !== '') {
      config.headers.common.Authorization = 'bearer ' + token
    }
    return config
  },
  (error: Error) => {
    console.log(error) // for debug
  }
)

service.interceptors.response.use(
  (response: any) => {
    if (response.data.Code === 502002) {
      // cleartoken()
    }
    return response
  },
  (error: Error) => {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default service
