import { request } from '@/utils/request'
import {} from './types'

export const apiGetCoronaCount = () => {
  return request({
    url: '/corona/count',
    method: 'get'
  })
}

export const apiGetCoronaTrend = () => {
  return request({
    url: '/corona/trend',
    method: 'get'
  })
}

export const apiGetCoronaRatio = () => {
  return request({
    url: '/corona/ratio',
    method: 'get'
  })
}