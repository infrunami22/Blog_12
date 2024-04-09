<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {LoginService} from '../services/LoginService'
import ListBox from '@/components/ListBox.vue'

const loginService = new LoginService()


let felh = ref(loginService.getUserName())

let adatok = [
    {title:"proba1",description:"description1",id:1,typename:"proba1"},
    {title:"proba2",description:"description2",id:2,typename:"proba2"},
]
</script>

<template>
  <h1>Üdvözöljük,{{ felh }}!</h1>
  <ListBox :topic-list="adatok"/> 
    
</template>