import {TestPage} from '@/pages/test-page'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/test",
    component: TestPage
  }]
})
