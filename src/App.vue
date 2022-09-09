<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Nav/Navbar.vue'
</script>

<template>
  <div class="bg-grass1 min-h-screen text-white relative overflow-hidden">
    <Navbar />
    <RouterView />
  </div>
</template>
