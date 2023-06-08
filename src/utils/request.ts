import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'
// import { storeToRefs } from 'pinia'
import { HTTP_STATUS, CODES } from '@/constant/httpEnums'
import { getEnvValue } from '@/utils/index'
import { ElMessage } from 'element-plus'

// create an axios instance
const request = axios.create({
  baseURL: getEnvValue('VITE_APP_BASE_API'),
  timeout: 10000
})

const requestArr = [request]

// 一段时间内的提示显示的防抖，防抖时间设置为5秒
let errMsgDebounceTimer: any = null
const errMsgDebounceWait = 5000

requestArr.forEach((service) => {
  // request interceptor
  service.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
    //   if (token.value) {
    //     config.headers!.Authorization = `Bearer ${token.value}`
    //   }
      return config
    },
    (error: AxiosError) => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    async (response: AxiosResponse) => {
      const res = response.data
      const statusCode = res.code || response.status

      // blob文件流
      if (res instanceof Blob) {
        return res
      }

      // 成功
      if (statusCode === CODES.SUCCESS) {
        return res
      }

      // token失效
      if (statusCode === CODES.UN_AUTHORIZED) {
        return Promise.reject(new Error('token过期！'))
      }

      const errMsg = res.message || res.msg

      ElMessage({
        message: errMsg || 'Error',
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(errMsg || 'Error'))
    },
    async (error: AxiosError) => {
      console.log('err' + error) // for debug

      // 定时器提示报错的防抖
      const errorDebounceHandler = (errorMessage: string) => {
        if (errMsgDebounceTimer) clearTimeout(errMsgDebounceTimer)
        const callNow = !errMsgDebounceTimer
        errMsgDebounceTimer = setTimeout(() => {
          errMsgDebounceTimer = null
        }, errMsgDebounceWait)

        if (callNow) {
            ElMessage({
            message: errorMessage,
            type: 'warning',
            duration: errMsgDebounceWait
          })
        }
      }

      const errorData = error.response!.data as any
      const errorStatus = error.response!.status

      if (errorStatus === HTTP_STATUS.UN_AUTHORIZED) {
        errorDebounceHandler(error.message)
      } else if (
        errorData.code === HTTP_STATUS.INTERNAL_SERVER_ERROR
      ) {
        // 500特殊处理
        return Promise.reject(error)
      } else {
        errorDebounceHandler(error.message)
        return Promise.reject(error)
      }
    }
  )
})

export { request }
