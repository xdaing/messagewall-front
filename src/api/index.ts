import axios, { type AxiosResponse } from 'axios'
import { notice } from '@/components/Notice'
export const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})
request.interceptors.response.use(<K, V = SuccessResponse<K>>(response: AxiosResponse<V>): V => {
    return response.data
}, (): ErrorResponse => {
    notice.error('出错了')
    return { state: 400 }
})