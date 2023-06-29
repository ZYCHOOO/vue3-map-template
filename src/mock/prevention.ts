import * as prevention from '@/constant/preventionData.json'

export default [
  {
    url: '/corona/count',
    type: 'get',
    response: (_config: any) => {
      return {
        code: 200,
        data: prevention.corona.statistics
      }
    }
  },
  {
    url: '/corona/trend',
    type: 'get',
    response: (_config: any) => {
      return {
        code: 200,
        data: prevention.corona.trend
      }
    }
  },
  {
    url: '/corona/ratio',
    type: 'get',
    response: (_config: any) => {
      return {
        code: 200,
        data: prevention.corona.ratio
      }
    }
  }
]