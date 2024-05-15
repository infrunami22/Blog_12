<script setup lang="ts">
import Vue, { inject, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { LoginService } from '@/services/LoginService';



const loginService = new LoginService()
const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const status = ref(false)
let commenttext = ref('')

let adatok = ref({})
console.log(id)
watch(() => route.params.id, (newId, oldId) => {
  // react to route changes...
  id.value = newId.toString()
})


async function getComments(){
  const res = await fetch("http://localhost:5000/topics/"+id.value+"/" , loginService.header());
  const comment = await res.json();
  console.log(comment)
  return comment
}
getComments().then(data => {
  adatok.value = data
  status.value = true;
})

async function sendComment(){
const headers = loginService.header().headers
  const content = {content: commenttext.value}
  console.log(content)
  const response = await fetch('http://localhost:5000/topics/'+ id.value + '/comments', {
    method: 'POST',
    headers,
    body: JSON.stringify(content),
  })
  const content_fromsjon = await response.json();

  if(response.status == 201){
     console.log(content_fromsjon)
     getComments().then(data => {
  adatok.value = data
  status.value = true;
})
  commenttext.value = ''
  }
  else{
   console.log('nem sikerült')
  }

  console.log(content)
}

async function subscribe(){
  const headers = loginService.header().headers
  const response = await fetch('http://localhost:5000/topics/'+ id.value + '/subscribe', {
    method: 'POST',
    headers,
  })
  const content_fromsjon = await response.json();
  console.log(content_fromsjon)
}

</script>


<template>
    <div>
    <p>Post adatok:</p>
    <p>{{ id }}</p>
    <!--
      <p v-if="status" v-bind:topic-list="toRaw(adatok[0])"></p>
    -->

    <div v-if="status" v-for="data in adatok.comments" :key="data._id">
    <p>
    {{ data.content }}
    by: {{ data.user_id }}<br>
    {{ data.timestamp }}
    </p>


    </div>
    <p v-else>Loading</p>
    
    </div>
    <div>
      <p>Új hozzászólás</p>
         <div style="background-color: blue; width: 400px;">
             <textarea  type="textarea" id="commenttext" v-model="commenttext"></textarea><button id="commentsend" @click="sendComment()">Küld</button>
             <button @click="subscribe()">Feliratkozás</button>
         </div>
    </div>
    
   
    
</template>