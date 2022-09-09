<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <p
    class="text-center text-red-400 font-bold text-lg border-2 border-red-800 py-2 mb-5"
  >
    {{ message }}
  </p>
</template>
