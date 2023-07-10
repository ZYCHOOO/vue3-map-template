import Mock from "mockjs"
import { MockParams } from './type'
import { getEnvValue } from '@/utils/index'
import map from './map'
import medic from './medic'
import cultural from './cultural'
import prevention from './prevention'
import education from './education'
// import new mock
const mocks = [
  ...map,
  ...medic,
  ...cultural,
  ...prevention,
  ...education,
// add mock into mocks
]

//设置延时时间
Mock.setup({
  timeout: '300'
})

function XHR2ExpressReqWrap (respond: any) {
  return function (options: any) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      // https://expressjs.com/en/4x/api.html#req
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: url
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}

export function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  let i: MockParams
  for (i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || 'get',
      XHR2ExpressReqWrap(i.response)
    )
  }
}

export function initMockServer () {
  const NEED_MOCK = getEnvValue('VITE_APP_NEED_MOCK')
  if (NEED_MOCK === 'true') {
    mockXHR()
  }
}