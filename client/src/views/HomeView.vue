<script setup lang="ts">
import { reactive, ref, toRaw, watchEffect } from 'vue'
import {LoginService} from '../services/LoginService'
import ListBox from '@/components/ListBox.vue'

const loginService = new LoginService()
let felh = ref(loginService.getUserName())
let adatok = reactive([])
const status = ref(false)

async function getTopics() {
  const response = await fetch("http://localhost:5000/api/posts");
  const topics = await response.json();
  console.log(topics)
  if(response.ok){
    console.log("fasz")


    return await topics
  }else {return []}

}
getTopics().then(data => {
  adatok.push(data)
  status.value = true;
})



</script>

<template>
  <h1>Üdvözöljük,{{ felh }}!</h1>  
  <ListBox v-if="status" v-bind:topic-list="toRaw(adatok[0])"/>
  <p v-else>Loading</p><input type="checkbox" id="owncomments">Hozzászóltam

    
</template>