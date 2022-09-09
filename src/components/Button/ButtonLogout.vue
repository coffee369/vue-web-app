<script setup lang="ts">
import useAPI from '@/hooks/useAPI'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await useAPI({
    url: '/auth/signout',
    method: 'POST',
  })
    .then(() => {
      authStore.logOut()
      localStorage.removeItem('access_token')
      router.push('/')
    })
    .catch(() => {
      localStorage.removeItem('access_token')
    })
}
</script>

<template>
  <button
    @click="handleLogout"
    class="px-3 py-1 font-semibold transition duration-300 ease-in-out text-grass11 bg-grass4 hover:bg-grass5 rounded focus:border-grass focus:outline-none focus:shadow-outline"
  >
    Logout
  </button>
</template>
