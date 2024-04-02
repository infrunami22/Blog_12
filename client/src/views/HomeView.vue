<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {LoginService} from '../services/LoginService'
import ListBox from '@/components/ListBox.vue'

const loginService = new LoginService()


let felh = ref(loginService.getUserName())

</script>

<template>
  <h1>Üdvözöljük,{{ felh }}!</h1>
  <ListBox/> 
    
</template>