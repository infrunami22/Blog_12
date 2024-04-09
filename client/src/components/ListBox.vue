<script setup lang="ts">
  import { ref } from 'vue';
import ListComponent from './ListComponent.vue';
  const props= defineProps(['topicList'])
  const type = ref('')
  let adatok = props.topicList

let filterData = ref(adatok.slice())

  function SortByType(){

    filterData.value = []
    
    if (type.value == null || type.value == ''){
      filterData.value = adatok.slice()
      return;
    }

    for(let i=0 ; i<adatok.length ; i++){
       if(adatok[i].typename.includes(type.value)){
          filterData.value.push(adatok[i])
       }
    }

  }
</script>
<template>
  <div style="background-color: beige; width: 500px">
    <p>Szűrés</p><input type="text" id="type" name="type" v-model="type" @keyup="SortByType()">
    <div id="list">
      <ListComponent v-for="data in filterData"
    :title="data.title"
    :description="data.description"
    :id="data.id"
    :typename="data.typename"
    :key="data.id"
     />
    </div>
    </div>
</template>