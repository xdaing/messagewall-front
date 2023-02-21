import axios from 'axios'
import { notice } from '@/components/Notice'
import type { ErrorResponse } from '@/types'

export const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})
request.interceptors.response.use(response => {
    return response.data
}, (): ErrorResponse => {
    notice.error('出错了')
    return { statusCode: 400 }
})