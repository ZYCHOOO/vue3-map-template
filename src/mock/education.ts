import { getQueryString } from '@/utils'
import * as education from '@/constant/educationData.json'

export default [
  {
    url: '/education/count',
    type: 'get',
    response: (config: any) => {
      const key = getQueryString(config.query, 'type')
      return {
        code: 200,
        data: education[key as keyof typeof education].count
      }
    }
  },
  {
    url: '/education/general',
    type: 'get',
    response: (_config: any) => {
      return {
        code: 200,
        data: education.general
      }
    }
  },
  {
    url: '/education/config',
    type: 'get',
    response: (config: any) => {
      const key = getQueryString(config.query, 'type')
      return {
        code: 200,
        data: education[key as keyof typeof education].config
      }
    }
  },
  {
    url: '/education/rank',
    type: 'get',
    response: (config: any) => {
      const key = getQueryString(config.query, 'type')
      return {
        code: 200,
        data: education[key as keyof typeof education].rank
      }
    }
  },
  {
    url: '/education/trend',
    type: 'get',
    response: (config: any) => {
      const key = getQueryString(config.query, 'type')
      return {
        code: 200,
        data: education[key as keyof typeof education].trend
      }
    }
  }
]