import { request } from './index'

export const getPhoto: RequestFunction = params => request.get('photos', { params })

export const createPhoto: RequestFunction = data => request.post('upload', data)

export const getPhotoComment: RequestFunction = params => request.get('photoComment', { params })

export const createPhotoComment: RequestFunction = data => request.post('photoComment', data)

export const likePhoto: RequestFunction = data => request.post('photos/like', data)


