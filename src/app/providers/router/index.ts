import ChannelsPage from '@/pages/channels/ui/ChannelsPage.vue'
import ChatPage from '@/pages/chat/ui/ChatPage.vue'
import { TestPage } from '@/pages/test-page'
import { createRouter, createWebHistory } from 'vue-router'
import { chatLoader } from './chat-loader'
import { loginGuard } from './login-guard'
import { LoginPage } from '@/pages/login' 

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    redirect: "/channels"
  }, {
    name: "channels",
    path: "/channels",
    component: ChannelsPage
  }, {
    name: "chat",
    path: "/chat/:id",
    component: ChatPage,
    beforeEnter: chatLoader
  }, {
    name: "login",
    path: "/login",
    component: LoginPage,
  }, {
    path: "/test",
    component: TestPage
  }]
})

router.beforeEach(loginGuard)
