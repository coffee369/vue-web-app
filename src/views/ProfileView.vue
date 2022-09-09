<script setup lang="ts">
import Layout from '@/components/Layout/Layout.vue'
import H1 from '@/components/Headings/H1.vue'
import Profile from '@/components/Profile/Profile.vue'
import Loader from '@/components/Loader/Loader.vue'
</script>

<template>
  <Layout>
    <div class="mx-auto gap-10 relative px-4">
      <H1>User Information</H1>

      <Suspense>
        <Profile />
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </div>
  </Layout>
</template>
