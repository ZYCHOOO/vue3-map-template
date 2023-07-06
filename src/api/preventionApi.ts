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

export const apiGetNoroCount = () => {
  return request({
    url: '/noro/count',
    method: 'get'
  })
}

export const apiGetNoroTrend = () => {
  return request({
    url: '/noro/trend',
    method: 'get'
  })
}

export const apiGetMpoxCount = () => {
  return request({
    url: '/mpox/count',
    method: 'get'
  })
}

export const apiGetMpoxRatio = () => {
  return request({
    url: '/mpox/ratio',
    method: 'get'
  })
}

export const apiGetRiskCount = () => {
  return request({
    url: '/risk/count',
    method: 'get'
  })
}

export const apiGetCureCount = () => {
  return request({
    url: '/cure/count',
    method: 'get'
  })
}

export const apiGetInfectionRatio = () => {
  return request({
    url: '/infection/ratio',
    method: 'get'
  })
}

export const apiGetInfectionTrend = () => {
  return request({
    url: '/infection/trend',
    method: 'get'
  })
}