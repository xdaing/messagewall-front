import { likeMessage } from '@/api/message'
import { likePhoto } from '@/api/photo'
import { computed } from 'vue'
import { useVisitorStore } from '@/stores/visitor'
import { notice } from '@/components/Notice'

interface LikeCard {
    readonly _id: string
    readonly visitorId: string
}
const visitorStore = useVisitorStore()
export const useLikeCardHook = (type: 'message' | 'photo', card: Card) => {
    const loveColor = computed<string>(() => {
        return card.liked.includes(visitorStore.visitorId) ? '#f67770' : '#949494'
    })
    const like = async () => {
        const likeCard: LikeCard = {
            _id: card._id,
            visitorId: visitorStore.visitorId
        }
        let response: MyResponse<string>
        if (type === 'message') response = await likeMessage<LikeCard, string>(likeCard)
        else response = await likePhoto<LikeCard, string>(likeCard)
        if (response.state === 200) {
            notice.success(response.data)
            const index: number = card.liked.indexOf(visitorStore.visitorId)
            if (index !== -1) card.liked.splice(index, 1)
            else card.liked.push(visitorStore.visitorId)
        }
    }
    return {
        loveColor,
        like
    }
}