import type { User } from '@/types/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      user: null as User | null,
    }
  },
  actions: {
    updateUser(payload: User) {
      this.user = payload
    },
    updateEmail(payload: Pick<User, 'email' | 'updatedAt'>) {
      if (!this.user) {
        return
      }
      this.user.email = payload.email
      this.user.updatedAt = payload.updatedAt
    },
  },
})
