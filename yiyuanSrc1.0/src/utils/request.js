import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import qs from 'qs'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://192.168.10.11:9100',
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method == 'get') {
      if(config.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8'){
        return config.data
      }
    }
    if (getToken()) {
      config.headers['Authentication'] = getToken('Admin-Token') // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // if(config.type == 'formData' || config.method != 'post'){
    //     return config
    // }
    if (!config.data) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
    const code = res.data.code
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
    //  else if (code !== 200 && code !== 201) {
    //   Notification.error({
    //     title: res.data.msg
    //   })
    //   return Promise.reject('error')
    // }
    else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const get = (url, data) => service.get(url, {
  params: data
})

const post = (url, data) => service.post(url, data)

export {
  get,
  post
}
