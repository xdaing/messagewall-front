import { request } from './index'
import type { RequestFunction, QueryInfo, Card, NewComment, Comment, CreateCard, LikeCard } from '@/types'
// QueryInfo, Array<Card>

export const getMessage: RequestFunction<QueryInfo, Array<Card>> = params => request.get('messages', { params })

export const createMessage: RequestFunction<CreateCard, Card> = data => request.post('messages', data)

export const getMessageComment: RequestFunction<QueryInfo, Array<Comment>> = params => request.get('messageComment', { params })

export const createMessageComment: RequestFunction<NewComment, Comment> = data => request.post('messageComment', data)

export const likeMessage: RequestFunction<LikeCard, string> = data => request.put('messages/like', data)

