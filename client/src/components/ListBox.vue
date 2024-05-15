<script setup lang="ts">
  import { ref } from 'vue';
import ListComponent from './ListComponent.vue';
  const props= defineProps(['topicList' , 'showInput'])
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
      console.log(adatok[i].type)
       if(adatok[i].type.name.includes(type.value)){
          filterData.value.push(adatok[i])
       }
    }

  }
</script>
<template>
  <div style="background-color: beige; width: 500px">
    <div v-show="props.showInput">
      <p>Szűrés</p><input type="text" id="type" name="type" v-model="type" @keyup="SortByType()">
    </div>

    <div id="list">
    <ListComponent v-for="data in filterData"
    :title="data.title"
    :description="data.description"
    :id="data.id"
    :typename="data.type.name"
    :key="data.id"
     />

    </div>
    </div>
</template>