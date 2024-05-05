<script setup lang="ts">
import { ref, watchEffect,inject } from 'vue'
import { defineComponent } from 'vue';
import { computed } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router'
import {LoginService} from '../services/LoginService'
import App from '../App.vue';
let seen = ref(true);
let felh = ref('user1')
let jelszo = ref('password')
const router = useRouter()
const emit = defineEmits(['login'])
//const isLoggedIn = inject('isLoggedIn',ref(false))
let isLoggedIn = inject('isLoggedIn')
let role= inject('role')

const loginService = new LoginService()

let error  = ref('')

let image = ref('')


function belepes() {
  authUser()
}

async function  authUser()  {
  const userData = { username: felh.value, password: jelszo.value}
  console.log(userData)
  const response = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'

    },
    body: JSON.stringify(userData),
  })
  const content = await response.json();
  console.log(response)

  if(response.status == 200){
      loginService.login(content.accessToken,felh.value)
      if(loginService.getRole() == 'admin'){
        role.value = true
      }
      else{
        role.value = false
      }
      router.push('/')
      isLoggedIn.value = true

  }
  else{
    error.value = content.message
  }

  console.log(content)
}

</script>

<template>
  <div class="app">
    <p v-if="seen">
    <h1>Belépés</h1>
    Felhasználónév:<input id="felh" v-model="felh">
    <br>
    Jelszó:<input id="jelszo" v-model="jelszo">
    <br>
    <button id="belepes" @click='belepes'>belépés</button>

    <p id="error" style="color: red;font-weight: bold;">{{error}}</p>

    </p>
    <!--
    <p v-else>
    

    </p>
    -->

  </div>
</template>

<style></style>
