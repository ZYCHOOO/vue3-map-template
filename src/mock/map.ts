import * as trees from '@/constant/treeData.json'
import * as markers from '@/constant/markerData.json'

export default [
  {
    url: '/tree',
    type: 'post',
    response: (config: any) => {
      const { type } = config.body

      return {
        code: 200,
        data: trees[type as keyof typeof trees]
      }
    }
  },
  {
    url: '/college/markers',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: markers['college']
      }
    }
  }
]