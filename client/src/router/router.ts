import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import LandingView from '../views/LandingView.vue';
import { LoginService } from '@/services/LoginService';
import PostView from '@/views/PostView.vue';
import AdminView from '@/views/Admin.vue';






const routes = [
  { path: '/', name:"Home", component: HomeView },
  { path: '/login', name:'Login', component: LoginView },
  { path: '/landing', name:'LandingPage', component: LandingView },
  { path: '/topics/:id', name:'topics', component: PostView },
  { path: '/admin', name:'admin', component: AdminView },

]

const loginService = new LoginService()

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})





router.beforeEach(async (to, from) => {
    if (
      to.name !== 'LandingPage' &&
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