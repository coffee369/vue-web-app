<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import ButtonLogout from '../Button/ButtonLogout.vue'
import NavLinks from './NavLinks.vue'

const authStore = useAuthStore()
const { access_token } = storeToRefs(authStore)
</script>

<template>
  <header>
    <nav class="shadow">
      <div class="flex items-center justify-end gap-4 py-5 px-4">
        <NavLinks url="/">Home</NavLinks>
        <div v-if="!access_token">
          <NavLinks url="/register">Register</NavLinks>
          <NavLinks url="/login">Log In</NavLinks>
        </div>
        <div v-else>
          <NavLinks url="/profile">Profile</NavLinks>
          <ButtonLogout />
        </div>
      </div>
    </nav>
  </header>
</template>
