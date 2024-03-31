<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { defineComponent } from 'vue';
import { computed } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router'
import {LoginService} from '../services/LoginService'
let seen = ref(true);
let felh = ref('kminchelle')
let jelszo = ref('0lelplR')
const router = useRouter()
const emit = defineEmits(['login'])

const loginService = new LoginService()

let error  = ref('')

let image = ref('')


function belepes() {
  authUser()
  emit('login')
}

async function  authUser()  {
  const userData = { username: felh.value, password: jelszo.value }
  console.log(userData)
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  })
  const content = await response.json();
  console.log(response)
  image.value = content.image

  if(response.status == 200){
      loginService.login(content.token,content.username)
      router.push('/')
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
