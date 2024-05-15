<style scoped>
/* Styles for the snackbar */
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
}

/* Show the snackbar when the class 'show' is applied */
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animation for fading in */
@-webkit-keyframes fadein {
  from { bottom: 0; opacity: 0; }
  to { bottom: 30px; opacity: 1; }
}

@keyframes fadein {
  from { bottom: 0; opacity: 0; }
  to { bottom: 30px; opacity: 1; }
}

/* Animation for fading out */
@-webkit-keyframes fadeout {
  from { bottom: 30px; opacity: 1; }
  to { bottom: 0; opacity: 0; }
}

@keyframes fadeout {
  from { bottom: 30px; opacity: 1; }
  to { bottom: 0; opacity: 0; }
}
</style>

<script setup lang="ts">
import { ref,reactive, watchEffect,provide } from 'vue'
import {LoginService} from './services/LoginService'
import { useRouter, useRoute } from 'vue-router'
import { io } from 'socket.io-client'

import {socket} from './services/socketService'

socket.on('new_post',function(asd:any){
  console.log(asd)
  console.log("asdasdasdasds")
  showSnackbar(asd)
})


const loginService = new LoginService()
const router = useRouter()
let loggedin = ref(false);
let role = ref(false);


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
  if(loginService.checkLogin()){
  socket.on("connect", () => {
    socket.emit('user_id',{user_id: loginService.getUserId()})
  console.log("connected")
  });

  }
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

const snackbarVisible = ref(false);
const snackbarMessage = ref('');

// Define the function to show the snackbar
function showSnackbar(message) {
  snackbarMessage.value = message;
  snackbarVisible.value = true;
  // Hide the snackbar after 3 seconds
  setTimeout(() => {
    snackbarVisible.value = false;
  }, 3000);
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
  <div id="snackbar" :class="{ show: snackbarVisible }">{{ snackbarMessage }}</div>

</template>