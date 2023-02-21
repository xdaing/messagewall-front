export interface Card {
    _id: string
    name: string
    content: string
    time: Date
    label: number
    liked: Array<string>
    commentNumber: number
    color?: string
    image?: string
}
export interface NewComment {
    card: string
    name: string
    content: string
    avatar: string
    visitorId: string
}
export interface Comment {
    _id: string
    time: Date
    name: string
    content: string
    avatar: string
}
export interface QueryInfo {
    limit: number
    currentPage: number
    label?: number
    card?: string
}
export interface CreateCard {
    visitorId: string
    avatar: string
    name: string
    content: string
    color: string
    label?: number
    image?: string
}
export interface LikeCard {
    readonly _id: string
    readonly visitorId: string
}
export interface SuccessResponse<T> {
    statusCode: 200
    data: T
}
export interface ErrorResponse {
    statusCode: 400
}
export type MyResponse<K> = SuccessResponse<K> | ErrorResponse

export type RequestFunction<T = any, U = any> = (data: T) => Promise<MyResponse<U>>