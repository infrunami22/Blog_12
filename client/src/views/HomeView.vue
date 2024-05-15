<script setup lang="ts">
import { reactive, ref, toRaw, watchEffect } from 'vue'
import {LoginService} from '../services/LoginService'
import ListBox from '@/components/ListBox.vue'



const loginService = new LoginService()
let felh = ref(loginService.getUserName())
let adatok = reactive([])
let ownTopics = reactive([])
const checkboxStatus = ref(false)
const status = ref(false)
const ctstatus = ref(false)

async function getTopics() {
  const response = await fetch("http://localhost:5000/topics/list", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + loginService.checkLogin()
    }
  });
  const topics = await response.json();
  console.log(topics)
  if(response.ok){
    return await topics
  }else {return []}

}
getTopics().then(data => {
  adatok.push(data)
  status.value = true;
})

async function getOwnCommentTopics(){
  const cresponse = await fetch("http://localhost:5000/users/" + loginService.getUserId() + "/comments", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + loginService.checkLogin()
    }
  });
  const tresponse = await fetch("http://localhost:5000/topics/list", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + loginService.checkLogin()
    }
  });
  
  const comments = await cresponse.json();
  const topics = await tresponse.json();

let adatok = []
for (const topic of topics) {
    if(comments.find((obj) => {return obj.topic_id === topic.id})){
      adatok.push(topic)
    }
}

  if(cresponse.ok){
    return await adatok
  }else {return []}
}

function getDataSuggesttouser(){

  if(checkboxStatus.value != true){
      getOwnCommentTopics().then(data => {
        ownTopics = []
        ownTopics.push(data);
        ctstatus.value = true;
      })
  }else{
        ctstatus.value = false;
  }
}





</script>

<template>
  <h1>Üdvözöljük,{{ felh }}!</h1>  
  <ListBox v-if="status" v-bind:topic-list="toRaw(adatok[0])" v-bind:showInput =true></ListBox>
  <p v-else>Loading</p><input type="checkbox" id="owncomments" @click="getDataSuggesttouser()" v-model="checkboxStatus">Hozzászóltam
  <ListBox v-if="ctstatus" v-bind:topic-list="toRaw(ownTopics[0])" v-bind:showInput =false></ListBox>
</template>