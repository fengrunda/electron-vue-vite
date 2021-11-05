import { Method, AxiosRequestConfig, AxiosResponse } from 'axios'
import xhrService, { XhrParams } from './network'
// import store from '@/store'
// import { SUITE_ID } from '@/render/utils/config'
import { LoadingInterface, ToastInterface, errorFormatter, removeEmpty } from '@/render/utils/util'
import dayjs, { Dayjs } from 'dayjs'

export interface ApiConfigBase<T = never> {
  url?: string
  method?: Method
  headers?: any
  checkAuth?: boolean
  authCode?: Array<number | string>
  authKey?: string
  successKey?: string
  successCode?: number | string
  showToast?: boolean
  showLoading?: boolean,
  params?: T
}

export interface ApiConfig {
  url?: string
  method?: Method
  headers?: any
  checkAuth?: boolean
  authCode?: Array<number | string>
  authKey?: string
  successKey?: string
  successCode?: number | string
  showToast?: boolean
  showLoading?: boolean,
  params?: any
  [propName: string]: any
}

export interface ResponseData<T = any> {
  data: T
  code: string
  message: string
  status: number,
  serveTime: Dayjs
}
const request = async <T>(apiConfig: ApiConfig) => {
  const {
    checkAuth = true,
    authKey = 'code',
    authCode = ['4402'],
    successKey = 'status',
    successCode = 200,
    showToast = true,
    showLoading = false,
    url = '',
    headers = {},
    method = 'POST',
    params = {},
    ...options
  }: ApiConfig = apiConfig || {}
  const requestParams: XhrParams = Object.assign({
    url,
    data: params,
    method,
    headers: Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json;charset=utf-8'
      // suiteId: SUITE_ID
    }, headers)
  }, options)
  showLoading && LoadingInterface.open(url)
  try {
    // 是否需要传登录态
    if (checkAuth) {
      // const { token, authInfo } = store.state.user || {}
      // const { corpId } = authInfo || {}
      // // console.log('url :>> ', url, 'token', token, 'corpId', corpId)
      // if (!token || !corpId) {
      //   // console.log('url :>> ', url)
      //   store.commit('user/SET_TOKEN', '')
      //   store.commit('user/REMOVE_AUTH_INFO')
      //   store.dispatch('user/toLoginPage')
      //   return
      // }
      // requestParams.headers['x-auth-token'] = token
      // requestParams.headers.corpId = corpId
    }
    const axiosResponse = await xhrService<ResponseData<T>>(requestParams)
    const { data: responseData, status, statusText, headers, config, request } = axiosResponse || {}
    // let responseData = data
    // // console.warn('response', JSON.stringify(response))
    // if (typeof data !== 'object') {
    //   try { responseData = JSON.parse(data) } catch (error) { console.error(error) }
    // }
    const { Date: serveTime, 'x-auth-token': token } = headers
    if (token) {
      // store.commit('user/SET_TOKEN', token)
    }
    responseData.serveTime = dayjs(serveTime)
    // const { data } = responseData || {}
    showLoading && LoadingInterface.close()
    if (status < 400) {
      if (responseData[successKey] === successCode) {
        return Promise.resolve(responseData)
      } else if (authCode.some(code => code === responseData[authKey])) {
        // store.commit('user/SET_TOKEN', '')
        // store.commit('user/REMOVE_AUTH_INFO')
        // store.dispatch('user/toLoginPage')
        return
      }
    }
    showToast && ToastInterface(errorFormatter(responseData, url))
    return Promise.reject(responseData)
  } catch (error) {
    showLoading && LoadingInterface.close()
    showToast && ToastInterface(errorFormatter(error, url))
    return Promise.reject(error)
  }
}

export default request
