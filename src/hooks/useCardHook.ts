import { ref, reactive, watch, onUpdated, onMounted } from 'vue'
import lottie from 'lottie-web'
import { getMessage } from '@/api/message'
import { getPhoto } from '@/api/photo'
import loading from '@/assets/json/loading.json'
import type { Card, QueryInfo, MyResponse } from '@/types'
export const useCardHook = (type: 'message' | 'photo') => {
    // 留言或照片卡片
    const cards: Array<Card> = reactive([])
    // 存储 _id
    const cardIds: Set<string> = reactive(new Set())
    // 是否加载已经全部
    const isAll = ref<boolean>(false)
    // 是否正在加载
    const isLoading = ref<boolean>(false)
    // 当前 label 
    const currentLabel = ref<number>(-1)
    // 添加按钮的位置
    const buttonPosition = ref<number>(30)
    // 控制抽屉
    const showerDrawer = ref<boolean>(false)
    // 当前页面
    let currentPage: number = 0
    const limit: number = 16
    const changeLabel = (labelIndex: number) => currentLabel.value = labelIndex
    // 获取卡片
    const getCards = async () => {
        isLoading.value = true
        const queryInfo: QueryInfo = {
            currentPage: currentPage++,
            limit,
            label: currentLabel.value
        }
        let response: MyResponse<Array<Card>>
        if (type === 'message') response = await getMessage(queryInfo)
        else response = await getPhoto(queryInfo)
        // 请求成功
        if (response.statusCode === 200) {
            if (response.data.length === 0 || response.data.length < limit) isAll.value = true
            response.data.forEach((card: Card) => {
                if (!cardIds.has(card._id)) {
                    cardIds.add(card._id)
                    cards.push(card)
                }
            })
        }
        isLoading.value = false
    }
    // label 变化时重置状态重新发送请求
    watch(currentLabel, () => {
        isAll.value = false
        currentPage = 0
        cards.splice(0)
        cardIds.clear()
        getCards()
    }, { immediate: true })
    // 关闭抽屉，置空选择卡片
    const closeDrawer = () => {
        showerDrawer.value = false
        selectCardIndex.value = -1
    }
    // 当前选中的卡片
    const selectCardIndex = ref<number>(-1)
    const changeSelectCard = (index: number): void => {
        selectCardIndex.value = index
        showerDrawer.value = true
    }
    // 添加一个卡片
    const addCard = (card: Card) => {
        if (!cardIds.has(card._id)) {
            cardIds.add(card._id)
            cards.unshift(card)
        }
    }
    const cardsAndPosition = async () => {
        // 滚动条到顶部的距离
        const scrollTop: number = document.documentElement.scrollTop
        // 窗口高度，滚动条高度
        const clientHeight: number = document.documentElement.clientHeight
        // 页面这整体高度
        const scrollHeight: number = document.documentElement.scrollHeight
        // 距离底部50且没有加载完、没有处于加载状态
        if (scrollTop + clientHeight + 50 >= scrollHeight && !isAll.value && !isLoading.value) await getCards()
        // 使按钮处于安全位置
        if (scrollTop + clientHeight + 230 >= scrollHeight) {
            buttonPosition.value = scrollTop + clientHeight + 230 - scrollHeight
        } else buttonPosition.value = 30
    }
    onUpdated(cardsAndPosition)
    const animation = ref<HTMLDivElement | null>(null)
    onMounted(() => {
        window.addEventListener('scroll', cardsAndPosition)
        lottie.loadAnimation({
            container: animation.value!,
            renderer: 'svg',
            autoplay: true,
            animationData: loading
        })
    })
    return {
        currentLabel,
        changeLabel,
        isAll,
        isLoading,
        cards,
        addCard,
        showerDrawer,
        closeDrawer,
        selectCardIndex,
        changeSelectCard,
        buttonPosition,
        animation
    }
}