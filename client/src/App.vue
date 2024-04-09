<script setup lang="ts">
import { ref, watchEffect,provide } from 'vue'
import {LoginService} from './services/LoginService'
import { useRouter, useRoute } from 'vue-router'
const loginService = new LoginService()
const router = useRouter()
let loggedin = ref(false);
provide (
   'isLoggedIn' , loggedin
)
const emit = defineEmits(['login'])
watchEffect(() => {
  canSee()
  
})




function canSee(){
   if(loginService.checkLogin()){
      loggedin.value = true;
   }
   else{
    loggedin.value = false;
  
   }

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

</script>


<template>
  <nav>
    <button @click="goToHome()" v-show="loggedin">Go to Home</button>
    <button @click="goToLogin()" v-show="!loggedin">Go to Login</button>
    <button @click="logOut()" v-show="loggedin">LogOut</button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>