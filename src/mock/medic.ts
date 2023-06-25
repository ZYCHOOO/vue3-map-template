import * as medic from '@/constant/medicData.json'

export default [
  {
    url: '/medic/count',
    type: 'get',
    response: (_config: any) => {
      return {
        code: 200,
        data: medic['general']
      }
    }
  },
  {
    url: '/medic/trend',
    type: 'get',
    response: (_config: any) => {
      return {
        code: 200,
        data: medic['trend']
      }
    }
  },
  {
    url: '/medic/hospitals',
    type: 'get',
    response: (_config: any) => {
      return {
        code: 200,
        data: medic['hospitals']
      }
    }
  }
]