import { request } from '@/utils/request'
import {} from './types'

export const apiGetEducationCount = (type: string) => {
  return request({
    url: '/education/count',
    method: 'get',
    params: { type }
  })
}

export const apiGetEducationGeneral = () => {
  return request({
    url: '/education/general',
    method: 'get'
  })
}

export const apiGetEducationConfig = (type: string) => {
  return request({
    url: '/education/config',
    method: 'get',
    params: { type }
  })
}

export const apiGetEducationRank = (type: string) => {
  return request({
    url: '/education/rank',
    method: 'get',
    params: { type }
  })
}

export const apiGetEducationTrend = (type: string) => {
  return request({
    url: '/education/trend',
    method: 'get',
    params: { type }
  })
}