<script setup lang="ts">
import useAPI from '@/hooks/useAPI'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import ProfileBio from './ProfileBio.vue'
import ProfileDelete from './ProfileDelete.vue'
import ProfileEmail from './ProfileEmail.vue'
import ProfileName from './ProfileName.vue'
import ProfilePassword from './ProfilePassword.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const profileStore = useProfileStore()
const router = useRouter()

await useAPI({
  url: '/user/',
})
  .then((response) => {
    const { firstName, lastName, email, id, createdAt, updatedAt, profile } =
      response.data

    userStore.updateUser({
      firstName,
      lastName,
      email,
      id,
      createdAt,
      updatedAt,
    })
    profileStore.addProfile(profile)
  })
  .catch(() => {
    authStore.logOut()
    localStorage.removeItem('access_token')
    router.push('/')
  })
</script>

<template>
  <!-- Edit Names -->
  <ProfileName />

  <!-- Edit Bio -->
  <ProfileBio />

  <!-- Change Email -->
  <ProfileEmail />

  <!-- Change Password -->
  <ProfilePassword />

  <!-- Delete Account -->
  <ProfileDelete />
</template>
