import * as medic from '@/constant/medicData.json'

export default [
  {
    url: '/medic/count',
    type: 'get',
    response: (_config: any) => {
      return {
        code: 200,
        data: medic
      }
    }
  }
]