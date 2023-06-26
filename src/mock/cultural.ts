import { getQueryString } from '@/utils'
import * as cultural from '@/constant/culturalData.json'

export default [
  {
    url: '/cultural/composition',
    type: 'get',
    response: (config: any) => {
      const compositionKey = getQueryString(config.query, 'type')
      return {
        code: 200,
        data: cultural[compositionKey as keyof typeof cultural].composition
      }
    }
  },
  {
    url: '/cultural/trend',
    type: 'get',
    response: (config: any) => {
      const trendKey = getQueryString(config.query, 'type')
      return {
        code: 200,
        data: cultural[trendKey as keyof typeof cultural].trend
      }
    }
  },
  {
    url: '/hotel/count',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: cultural.hotel.count
      }
    }
  },
  {
    url: '/hotel/trend',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: cultural.hotel.trend
      }
    }
  }
]