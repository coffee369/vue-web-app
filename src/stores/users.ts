import type { UserProfile } from '@/types/user'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: [] as UserProfile[],
  }),
  actions: {
    updateUser(payload: UserProfile[]) {
      const filterItem = payload.filter((item) => {
        const duplicate = this.users.find((user) => user.id === item.id)
        return duplicate ? false : item
      })
      this.users.push(...filterItem)
    },
  },
})
