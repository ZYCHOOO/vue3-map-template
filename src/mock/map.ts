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
  },
  {
    url: '/highSchool/markers',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: markers['highSchool']
      }
    }
  },
  {
    url: '/middleSchool/markers',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: markers['middleSchool']
      }
    }
  },
  {
    url: '/primarySchool/markers',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: markers['primarySchool']
      }
    }
  },
  {
    url: '/kinderGarden/markers',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: markers['kinderGarden']
      }
    }
  },
  {
    url: '/hospital/markers',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: markers['hospital']
      }
    }
  },
  {
    url: '/pharmacy/markers',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: markers['pharmacy']
      }
    }
  }
]