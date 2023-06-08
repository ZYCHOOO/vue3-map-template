import { treeData } from './types'
import { request } from '@/utils/request'

export const apiGetTree = (data: treeData) => {
  return request({
    url: '/tree',
    method: 'post',
    data
  })
}
