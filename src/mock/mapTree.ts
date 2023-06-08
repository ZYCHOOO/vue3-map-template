export default [
  {
    url: '/tree',
    type: 'post',
    response: (config: any) => {
      const { type } = config.body

      return {
        code: 200,
        data: [{
          label: '大学',
          url: ''
        }]
      }
    }
  }
]