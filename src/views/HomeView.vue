<script setup lang="ts">
import Layout from '@/components/Layout/Layout.vue'
import Loader from '../components/Loader/Loader.vue'
import AsyncHome from '../components/Home/AsyncHome.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <Layout>
    <div v-if="authStore.access_token">
      <Suspense>
        <AsyncHome />
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </div>
    <div v-else class="min-h-[80vh] flex w-full items-center justify-center">
      <h1>Please login to view the list of users</h1>
    </div>
  </Layout>
</template>
