<script setup lang="ts">
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
import { createMessageComment, getMessageComment } from '@/api/message'
import { createPhotoComment, getPhotoComment } from '@/api/photo'
import { notice } from '@/components/Notice'
import { useVisitorStore } from '@/stores/visitor'
import MessageCard from './MessageCard.vue'
import Button from './Button.vue'
import type { Card, NewComment, MyResponse, QueryInfo, Comment } from '@/types'

const props = defineProps<{
    card: Card
    labels: Array<string>
    type: 'message' | 'photo'
}>()

const visitorStore = useVisitorStore()
// 当前页面
let currentPage: number = 0
// 评论数组
const comments: Array<Comment> = reactive([])
const commentIds: Set<string> = reactive(new Set())
// 签名
const name = ref<string>('')
// 评论内容
const content = ref<string>('')
// 是否已经加载全部
const isAll = ref<boolean>(false)
const limit: number = 10

// 新建评论
const createComment = async () => {
    if (content.value.trim() === '') notice.warn('内容不能为空')
    else {
        const defaultName: string = name.value.trim() || '匿名'
        const newComment: NewComment = {
            card: props.card._id,
            name: defaultName,
            content: content.value,
            avatar: visitorStore.avatarColor,
            visitorId: visitorStore.visitorId
        }
        let response: MyResponse<Comment>
        if (props.type === 'message') response = await createMessageComment(newComment)
        else response = await createPhotoComment(newComment)
        if (response.statusCode === 200) {
            notice.success('评论成功')
            props.card.commentNumber++
            commentIds.add(response.data._id)
            comments.unshift(response.data)
        }
        name.value = ''
        content.value = ''
    }
}
// 获取评论
const getComments = async () => {
    if (!isAll.value) {
        const queryInfo: QueryInfo = {
            card: props.card._id,
            limit,
            currentPage: currentPage++,
        }
        let response: MyResponse<Array<Comment>>
        if (props.type === 'message') response = await getMessageComment(queryInfo)
        else response = await getPhotoComment(queryInfo)
        if (response.statusCode === 200) {
            if (response.data.length === 0 || response.data.length < limit) isAll.value = true
            response.data.forEach((comment: Comment) => {
                if (!commentIds.has(comment._id)) {
                    commentIds.add(comment._id)
                    comments.push(comment)
                }
            })
        }
    }
}
getComments()
</script>
<template>
    <div class="card-detail">
        <div class="operation">
            <p class="revoke">踩一脚</p>
            <p class="report">举报</p>
        </div>
        <MessageCard :labels="labels" :card="card" style="width: 100%;"></MessageCard>
        <div class="form">
            <textarea class="content" placeholder="请输入..." maxlength="30" v-model="content"></textarea>
            <div class="submit">
                <input type="text" class="name" placeholder="签名" maxlength="6" v-model="name">
                <Button @click="createComment" type="dark">确定</Button>
            </div>
        </div>
        <div class="title">评论 {{ card.commentNumber }}</div>
        <div class="comments" v-for="comment in comments" :key="comment._id">
            <div class="comment">
                <div class="avatar" :style="{ backgroundImage: comment.avatar }"></div>
                <div class="info">
                    <div class="top">
                        <p class="name">{{ comment.name }}</p>
                        <p class="time">{{ dayjs(comment.time).format('MM/DD HH:mm') }}</p>
                    </div>
                    <div class="bottom">{{ comment.content }}</div>
                </div>
            </div>
        </div>
        <p class="state" v-if="isAll">没有更多评论了</p>
        <p class="state" v-else style="cursor: pointer;" @click="getComments">点击加载更多...</p>
    </div>
</template>
<style scoped lang="scss">
.card-detail {
    position: relative;
    padding: 0 20px 40px;
    user-select: none;

    .operation {
        padding-bottom: 20px;
        display: flex;

        .revoke {
            color: $primary;
            cursor: pointer;
            padding-right: 30px;
            font-size: 14px;
        }

        .report {
            color: $error;
            font-size: 14px;
            cursor: pointer;
        }
    }

    .form {
        .content {
            background: none;
            border: 1px solid rgba(148, 148, 148, 1);
            resize: none;
            height: 56px;
            padding: 8px;
            box-sizing: border-box;
            width: 100%;
            outline: none;
            margin-top: 12px;
        }

        .submit {
            display: flex;
            align-items: flex-end;

            .name {
                margin-top: 12px;
                margin-right: 30px;
                width: 200px;
                height: 36px;
                border: 1px solid rgba(148, 148, 148, 1);
                outline: none;
                padding: 8px;
                box-sizing: border-box;
                background: none;
                line-height: 20px;
                font-size: 15px;
            }
        }
    }

    .title {
        color: $dark-1;
        font-weight: 600;
        padding-top: 30px;
        padding-bottom: 20px;
    }

    .comments {
        .comment {
            display: flex;
            padding-bottom: 30px;

            .avatar {
                flex: none;
                width: 28px;
                height: 28px;
                border-radius: 50%;
            }

            .info {
                padding-left: 8px;

                .top {
                    display: flex;
                    align-items: center;

                    .name {
                        font-weight: 600;
                    }

                    .time {
                        font-size: 12px;
                        padding-left: 4px;
                        color: $dark-3;
                    }
                }

                .bottom {
                    padding-bottom: 4px;
                }
            }
        }
    }

    .state {
        color: $dark-2;
        width: 150px;
        font-size: 14px;
        margin: 0 auto;
    }
}
</style>