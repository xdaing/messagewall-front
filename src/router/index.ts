import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      redirect: 'message',
      children: [
        {
          path: 'message',
          component: () => import('@/views/Message.vue'),
          meta: { title: '留言' }
        },
        {
          path: 'photo',
          component: () => import('@/views/Photo.vue'),
          meta: { title: '照片' }
        }
      ]
    }
  ]
})
router.afterEach(to => {
  document.title = `咩咩 | ${to.meta.title}`
})

export default router
