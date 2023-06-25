import { request } from '@/utils/request'
import {} from './types'

export const apiGetMedicCount = () => {
  return request({
    url: '/medic/count',
    method: 'get'
  })
}

export const apiGetTrend = () => {
  return request({
    url: '/medic/trend',
    method: 'get'
  })
}

export const apiGetHospitals = () => {
  return request({
    url: '/medic/hospitals',
    method: 'get'
  })
}

// export const apiUpdateMedic = (data) => {
//   return request({
//     url: '/medic/update',
//     method: 'post',
//     data
//   })
// }