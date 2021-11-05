import request, { ApiConfig } from '@/render/utils/request'
/**
 * 获取微信jssdk签名
 * @param apiConfig
 */
export function getJsSignature (apiConfig?: ApiConfig) {
  return request<{
    list: Array<{
      id: number
      name: string
    }>
    page: number
    total: number
  }>({
    url: '/api/auth/getWXJsConfig',
    method: 'post',
    checkAuth: false,
    checkCorp: false,
    ...apiConfig
  })
}
