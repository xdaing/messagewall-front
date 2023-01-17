interface Card {
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
// interface BaseCard {
//     _id: string
//     name: string
//     content: string
//     time: Date
//     label: number
//     liked: Array<string>
//     commentNumber: number
// }
// interface MessageCard extends BaseCard {
//     color: string
// }
// interface PhotoCard extends BaseCard {
//     image: string
// }
interface NewComment {
    card: string
    name: string
    content: string
    avatar: string
    visitorId: string
}
interface Comment {
    _id: string
    time: Date
    name: string
    content: string
    avatar: string
}
interface QueryInfo {
    limit: number
    currentPage: number
    label?: number
    card?: string
}
interface CreateCard {
    visitorId: string
    avatar: string
    name: string
    content: string
    color: string
    label?: number
    image?: string
}
interface SuccessResponse<T> {
    state: 200
    data: T
}
interface ErrorResponse {
    state: 400
}
type MyResponse<K> = SuccessResponse<K> | ErrorResponse
interface RequestFunction {
    <U, K, V = MyResponse<K>>(param: U): Promise<V>
}