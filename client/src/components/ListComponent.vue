<script setup lang="ts">
import { useRouter } from 'vue-router';

  const props= defineProps(['title','id','description', 'typename'])
  console.log(props)
  const router = useRouter()


function navigateToPost(){
   router.push({name : 'post' , params : {id : props.id}})

}


</script>
<template>
    <div @click="navigateToPost()">
        {{ props.title }}
        
        {{ props.description }}

        {{ props.typename }}
    </div>

</template>