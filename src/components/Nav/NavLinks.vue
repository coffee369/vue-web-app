<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps({
  url: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="url">
    <span
      class="mr-4 text-sm font-semibold transition duration-300 ease-in-out text-grass12 hover:text-grass9"
      ><slot
    /></span>
  </RouterLink>
</template>
