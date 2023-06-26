import { request } from '@/utils/request'
import {} from './types'

export const apiGetCulturalComposition = (type: string) => {
  return request({
    url: '/cultural/composition',
    method: 'get',
    params: { type }
  })
}

export const apiGetCulturalTrend = (type: string) => {
  return request({
    url: '/cultural/trend',
    method: 'get',
    params: { type }
  })
}

export const apiGetHotelCount = () => {
  return request({
    url: '/hotel/count',
    method: 'get'
  })
}

export const apiGetHotelTrend = () => {
  return request({
    url: '/hotel/trend',
    method: 'get'
  })
}