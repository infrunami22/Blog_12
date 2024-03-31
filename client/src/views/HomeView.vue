<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {LoginService} from '../services/LoginService'
const loginService = new LoginService()


let felh = ref(loginService.getUserName())

</script>

<template>
  <h1>Üdvözöljük,{{ felh }}</h1>
    
</template>