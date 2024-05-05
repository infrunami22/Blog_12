<script setup lang="ts">
import { ref,reactive, watchEffect,provide } from 'vue'
import {LoginService} from './services/LoginService'
import { useRouter, useRoute } from 'vue-router'
const loginService = new LoginService()
const router = useRouter()
let loggedin = ref(false);
let role = ref(false)
provide (
   'isLoggedIn' , loggedin
)
provide (
   'role' , role
)
const emit = defineEmits(['login'])
watchEffect(() => {
  canSee()
  console.log(getRole())
})





function canSee(){
   if(loginService.checkLogin()){
      loggedin.value = true;

   }
   else{
    loggedin.value = false;
  
   }
  if(getRole() == "admin"){
    role.value = true
  }
  else{
    role.value = false
  }

}

function getRole(){
  return loginService.getRole()
}

async function logOut(){
  await loginService.logOut();
  canSee();
  router.push('/login')
}

function goToHome(){
  router.push('/')
  canSee();
  console.log('Home')
}

function goToLogin(){
    router.push('/login');
    canSee()
}

function goToLanding(){
  router.push('/landing')
}
function goAdmin(){
  router.push('/admin')
}
</script>


<template>
  <nav>
    <button @click="goToLanding()">LandingPage</button>
    <button @click="goToHome()" v-show="loggedin">Főoldal</button>
    <button @click="goToLogin()" v-show="!loggedin">Bejelentkezés</button>
    <button @click="goAdmin()" v-show="loggedin && role">Admin</button>
    <button @click="logOut()" v-show="loggedin">Kijelentkezés</button>

  </nav>
  <main>
    <RouterView />
  </main>
</template>