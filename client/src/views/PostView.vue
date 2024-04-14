<script setup lang="ts">
import Vue, { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
console.log(id)
watch(() => route.params.id, (newId, oldId) => {
  // react to route changes...
  id.value = newId.toString()
})
</script>


<template>
    <div>
    <p>Post</p>
    <p>{{ id }}</p>
    </div>
    <div>
      <p>Új hozzászólás</p>
         <div style="background-color: blue; width: 400px;">
             <textarea  type="textarea" id="comment"></textarea><button id="commentsend">Küld</button>
         </div>
    </div>
    
   
    
</template>