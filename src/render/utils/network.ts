import axios, { AxiosRequestConfig, Method, AxiosResponse, AxiosRequestHeaders } from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/'
axios.defaults.timeout = 1000 * 60
// axios.defaults.transformRequest = [data => qs.stringify(data)]
axios.interceptors.response.use((response) => {
  // Do something with response data
  return response
}, error => {
  // Do something with response error
  if (error.message.match('Network Error')) {
    error.message = '网络不给力！'
  }
  return Promise.reject(error)
})
export interface XhrParams {
  url: string
  method: Method
  headers?: any
  params?: any
  data?: any
  options?: AxiosRequestConfig
}
const xhrService = <T> ({ url, method, params, headers, data, ...options }: XhrParams) => {
  const userRequestData = !!['PUT', 'POST', 'PATCH'].find(methodName => method.toUpperCase() === methodName)
  const axiosParams: AxiosRequestConfig<T> = Object.assign({
    method,
    url,
    data: data,
    params: userRequestData ? null : params,
    headers,
    transformRequest: []
  }, options)
  const contentTypeKey = Object.keys(axiosParams.headers || {}).find((key) => key.toLowerCase() === 'content-type') || ''
  const contentType = contentTypeKey ? axiosParams?.headers?.[contentTypeKey] : ''
  if (!contentType?.toLowerCase().match('multipart/form-data')) {
    axiosParams.data = userRequestData ? Object.keys(data).length > 0 ? Object.assign({}, ...Object.keys(data).filter(key => data[key] !== undefined && data[key] !== null).map(key => Object.assign({ [key]: data[key] }))) : {} : null
  }
  if (contentType?.toLowerCase().match('application/x-www-form-urlencoded')) {
    axiosParams.transformRequest = [(data) => qs.stringify(data)]
  }
  return axios.request(axiosParams)
}

export default xhrService
