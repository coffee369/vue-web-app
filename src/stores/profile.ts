import type { Profile } from '@/types/profile'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => {
    return {
      profile: null as Profile | null,
    }
  },
  actions: {
    addProfile(payload: Profile) {
      this.profile = payload
    },
  },
})
