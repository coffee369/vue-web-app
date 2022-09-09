<script setup lang="ts">
defineProps<{
  title: string[]
}>()
</script>

<template>
  <thead class="bg-grass3">
    <tr>
      <th v-for="headTitle in title" :key="headTitle" class="p-2">
        {{ headTitle }}
      </th>
    </tr>
  </thead>
</template>
