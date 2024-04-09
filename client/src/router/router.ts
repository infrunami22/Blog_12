import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

import { LoginService } from '@/services/LoginService';
import PostView from '@/views/PostView.vue';

const routes = [
  { path: '/', name:"Home", component: HomeView },
  { path: '/login', name:'Login', component: LoginView },
  { path: '/post/:id', name:'post', component: PostView },

]

const loginService = new LoginService()

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
    if (
      // make sure the user is authenticated
      !loginService.checkLogin() &&
      // ❗️ Avoid an infinite redirect
      to.name !== 'Login'
    ) {
      // redirect the user to the login page
      return { name: 'Login' }
    }
  })

export default router