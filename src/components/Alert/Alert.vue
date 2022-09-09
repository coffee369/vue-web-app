<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <p
    class="text-center text-grass12 font-bold text-lg border-2 border-grass7 py-2 mb-4"
  >
    {{ message }}
  </p>
</template>
