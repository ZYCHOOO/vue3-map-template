import { treeData } from './types'
import { request } from '@/utils/request'

// 获取抽屉
export const apiGetTree = (data: treeData) => {
  return request({
    url: '/tree',
    method: 'post',
    data
  })
}

// 获取撒点
export const apiGetMarkers = (url: string) => {
  return request({
    url,
    method: 'get'
  })
}
