<script setup lang="ts">
import Vue, { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const status = ref(false)
let adatok = ref({})
console.log(id)
watch(() => route.params.id, (newId, oldId) => {
  // react to route changes...
  id.value = newId.toString()
})


async function getComments(){
  const res = await fetch("http://localhost:5000/topics/"+id.value+"/");
  const comment = await res.json();
  return comment
}
getComments().then(data => {
  adatok.value = data
  status.value = true;
})

async function sendComment(){

  const userData = { }
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
    <div>
    <p>Post adatok:</p>
    <p>{{ id }}</p>
    <!--
      <p v-if="status" v-bind:topic-list="toRaw(adatok[0])"></p>
    -->

    <div v-if="status" v-for="data in adatok.comments" :key="data._id">
    <p>
    {{ data.body }}
    by: {{ data.user_id }}<br>
    {{ data.timestamp }}
    </p>


    </div>
    <p v-else>Loading</p>
    
    </div>
    <div>
      <p>Új hozzászólás</p>
         <div style="background-color: blue; width: 400px;">
             <textarea  type="textarea" id="comment"></textarea><button id="commentsend">Küld</button>
         </div>
    </div>
    
   
    
</template>