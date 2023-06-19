import { request } from '@/utils/request'
import {} from './types'

export const apiGetMedicCount = () => {
  return request({
    url: '/medic/count',
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