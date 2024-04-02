<script setup lang="ts">
  import ListComponent from './ListComponent.vue';
  const props= defineProps(['topicList'])

  const adatok = [
    {title:"proba1",description:"description1",id:1,typename:"proba1"},
    {title:"proba2",description:"description2",id:1,typename:"proba2"},
]
  
</script>
<template>
<ListComponent v-for="data in adatok"
    :title="data.title"
    :description="data.description"
    :id="data.id"
    :typename="data.typename"
    :key="data.id"
     />
</template>