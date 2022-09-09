<script setup lang="ts">
import ButtonDelete from '@/components/Button/ButtonDelete.vue'
import useAPI from '@/hooks/useAPI'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LayoutProfile from '../Layout/LayoutProfile.vue'

const authStore = useAuthStore()
const router = useRouter()
const confirm = ref(false)

const handleClick = async () => {
  if (!confirm.value) {
    confirm.value = true
    return
  }

  await useAPI({
    url: '/user',
    method: 'DELETE',
  })
    .then(() => {
      authStore.logOut()
      localStorage.removeItem('access_token')
      router.push('/')
    })
    .catch((e) => {
      console.error('something went wrong', e)
    })
}
</script>

<template>
  <LayoutProfile>
    <div class="text-center">
      <ButtonDelete @click="handleClick">
        {{ !confirm ? 'Delete Account' : 'Click again to confirm' }}
      </ButtonDelete>
    </div>
  </LayoutProfile>
</template>
