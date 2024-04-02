<script setup lang="ts">
  const props= defineProps(['title','id','description', 'typename'])
  console.log(props)

</script>
<template>
    <div>
        {{ props.title }}
        
        {{ props.description }}

        {{ props.typename }}
    </div>

</template>