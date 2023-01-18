<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import AddButton from '@/components/AddButton.vue'
import Drawer from '@/components/Drawer.vue'
import MessageCard from '@/components/MessageCard.vue'
import Detail from '@/components/Detail.vue'
import NewCard from '@/components/NewCard.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useCardHook } from '@/hooks/useCardHook'
const title: string = '留言墙'
const slogan: string = '很多事情值得记录，当然也值得回味。'
const labels: Array<string> = ['留言', '目标', '理想', '过去', '将来', '爱情', '亲情', '友情', '秘密', '信条', '无题']
const {
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
} = useCardHook('message')
</script>
<template>
    <div>
        <Tabs :title="title" :slogan="slogan" :labels="labels" :currentLabel="currentLabel" @changeLabel="changeLabel">
        </Tabs>
        <div class="messages">
            <div class="empty" v-if="cards.length === 0 && isLoading === false">
                <SvgIcon name="card" class="icon"></SvgIcon>
                <p>还没有留言,快贴上第一张吧</p>
            </div>
            <div class="message-grid">
                <MessageCard :labels="labels" class="message" @selectCard="changeSelectCard(index)"
                    v-for="(card, index) in cards" :key="card._id" :card="card">
                </MessageCard>
            </div>
            <div ref="animation" v-show="isLoading" class="loading"></div>
        </div>
        <!-- 页面状态 -->
        <div v-if="isAll && cards.length !== 0" class="isAll">没有更多了...</div>
        <AddButton @click="showerDrawer = true" :position="buttonPosition"></AddButton>
        <!-- 抽屉关闭的动画 -->
        <Transition name="drawer" :duration="500">
            <Drawer v-if="showerDrawer" @close="closeDrawer" :title="selectCardIndex === -1 ? '留言' : '详情'">
                <Detail :labels="labels" v-if="selectCardIndex !== -1" :card="cards[selectCardIndex]" type="message">
                </Detail>
                <NewCard v-else :labels="labels" type="message" @close="closeDrawer" @refresh="addCard"></NewCard>
            </Drawer>
        </Transition>
    </div>
</template>
<style scoped lang="scss">
.messages {
    min-height: 400px;

    .empty {
        margin: 100px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            width: 100px;
            height: 100px;
        }

        p {
            user-select: none;
            font-size: 25px;
            font-weight: 600;
            margin-top: 20px;
            color: $dark-3;
        }
    }

    .message-grid {
        max-width: 1200px;
        margin: 0 auto 20px auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, 290px);
        justify-content: center;
        align-items: center;
        justify-items: center;

        .message {
            margin-bottom: 12px;
            transition: transform 0.5s ease;

            &:hover {
                transform: translateY(-6px);
            }
        }
    }
}

.isAll {
    font-size: 14px;
    width: 100px;
    margin: 0 auto;
    color: $dark-2;
}

.loading {
    margin: 0 auto;
    height: 200px;
    margin-bottom: -60px;
}
</style>