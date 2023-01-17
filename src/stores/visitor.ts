import { defineStore } from 'pinia'
import { getVisitorId, getVisitorAvatarColor } from '@/utils/visitorInfo'

export const useVisitorStore = defineStore('visitor', {
  state: () => ({
    visitorId: getVisitorId(),
    avatarColor: getVisitorAvatarColor(),
  })
})
