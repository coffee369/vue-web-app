import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    access_token: useStorage('access_token', ''),
  }),
  actions: {
    logIn(payload: string) {
      this.access_token = payload
    },
    logOut() {
      this.access_token = ''
    },
  },
})
