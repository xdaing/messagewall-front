import { request } from './index'

export const getMessage: RequestFunction = params => request.get('messages', { params })

export const createMessage: RequestFunction = data => request.post('messages', data)

export const getMessageComment: RequestFunction = params => request.get('messageComment', { params })

export const createMessageComment: RequestFunction = data => request.post('messageComment', data)

export const likeMessage: RequestFunction = data => request.post('messages/like', data)

