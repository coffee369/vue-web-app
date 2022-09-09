<script setup lang="ts">
import Td from '../Table/Td.vue'
import Tr from '../Table/Tr.vue'
import useHome from './useHome'
import THead from '../Table/THead.vue'

const { users, currentPage, pages, handlePagination, initialFetch } = useHome()

initialFetch()
</script>

<template>
  <table class="table-fixed w-full hover:table-fixed">
    <THead :title="['Name', 'Email', 'User Bio', 'Date Joined']" />
    <tbody v-if="users.length">
      <Tr v-for="user in users" :key="user.id">
        <Td>{{ user.firstName + ' ' + user.lastName }}</Td>
        <Td>{{ user.email }}</Td>
        <Td>{{ user.profile?.bio }}</Td>
        <Td class="text-right">{{
          new Date(user.createdAt ? user.createdAt : '').toLocaleString()
        }}</Td>
      </Tr>
    </tbody>
  </table>

  <div class="py-4">
    <span
      @click="handlePagination(page)"
      class="px-4 py-2 cursor-pointer hover:bg-grass2"
      :class="page === currentPage ? `bg-grass3` : ''"
      v-for="(page, index) in pages"
      :key="index"
    >
      {{ page }}
    </span>
  </div>
</template>
