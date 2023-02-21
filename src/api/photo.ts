import { request } from './index'
import type { RequestFunction, NewComment, Comment, QueryInfo, Card, LikeCard } from '@/types'

export const getPhoto: RequestFunction<QueryInfo, Array<Card>> = params => request.get('photos', { params })

export const createPhoto: RequestFunction<FormData, Card> = data => request.post('upload', data)

export const getPhotoComment: RequestFunction<QueryInfo, Array<Comment>> = params => request.get('photoComment', { params })

export const createPhotoComment: RequestFunction<NewComment, Comment> = data => request.post('photoComment', data)

export const likePhoto: RequestFunction<LikeCard, string> = data => request.put('photos/like', data)


