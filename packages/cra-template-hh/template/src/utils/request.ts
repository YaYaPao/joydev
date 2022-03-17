import Axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

// 声明一个 Map 用于存储每个请求的标识和取消方法，目的是为了避免重复请求
// 在发出请求前，将之前重复的请求 cancel 掉，发起当前请求
// 在处理完并接受到请求结果后，清除当前请求的缓存
const pending = new Map()

const ignorePath = ['login']

const jwtToken = 'ars-token'

// axios 实例
const service = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7071/api/' : 'https://api.7k7k.life/api/',
  timeout: 5 * 60000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

// 在 pending 内添加请求对
const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
  // current request config params
  // 通过工厂方法创建 canceltoken，用于取消用户请求
  const crt = config
  crt.cancelToken =
    config.cancelToken ||
    new Axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}

/**
 * 在 pending 内删除请求对
 * 取消当前请求
 */
const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

// 清除所有的请求
export const clearPending = () => {
  pending.forEach(([url, cancel]) => {
    cancel(url)
  })
  pending.clear()
}

// 设置请求拦截器
service.interceptors.request.use(
  (config) => {
    const crt = config as any
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    // 添加
    const { url } = config
    if (crt && crt.headers && url && !ignorePath.includes(url)) {
      crt.headers[jwtToken] = window.localStorage.getItem(jwtToken)
    }
    return crt
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 设置响应拦截器，这里拦截网络请求本身的错误
service.interceptors.response.use(
  (response) => {
    removePending(response.config) // 在请求结束后，移除本次请求    
    if (response && response.data) {
      // todo 处理 token 过期逻辑
      const { code, message } = response.data
      if (code === 500 && message.includes('jwt')) {
        const { origin } = window.location
          window.location.href = `${origin}/user/login`
      }
    }
    return response
  },
  (error) => {
    // 如果是 cancel 引起的错误，则再次进行尝试
    if (Axios.isCancel(error)) {
      // 再次尝试 cancel
      console.error(error.message)
    }
    return Promise.reject(error)
  },
)

export const get = async (url: string, config: AxiosRequestConfig = {}): Promise<any> => {
  const res = await service.get(url, config)
  return res.data || {}
}

export const post = async (url: string, data: any, config = {}): Promise<any> => {
  const res = await service.post(url, data, config)
  return res.data || {}
}

export const del = async (url: string, config = {}) => {
  const res = await service.delete(url, config)
  return res.data || {}
}

export const patch = async (url: string, data: any, config = {}) => {
  const res = await service.patch(url, data, config)
  return res.data || {}
}

export const put = async (url: string, data: any, config = {}) => {
  const res = await service.put(url, data, config)
  return res.data || {}
}
