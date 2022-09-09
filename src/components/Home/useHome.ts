import useAPI from '@/hooks/useAPI'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

export default function useHome() {
  const usersStore = useUsersStore()
  const store = storeToRefs(usersStore)
  const { updateUser } = usersStore

  const currentPage = ref(1)
  const pages = ref(0)

  const initialFetch = async () => {
    currentPage.value = 1
    pages.value = 0
    usersStore.$patch({ users: [] })

    await useAPI({
      url: '/user/list',
      params: {
        page: currentPage.value,
        perpage: 5,
      },
    }).then((response) => {
      const data = response.data

      if (data.users.length) {
        pages.value = data.meta.pages
        updateUser(data.users)
      }
    })
  }

  const handlePagination = async (pageNumber: number) => {
    await useAPI({
      url: '/user/list',
      params: {
        page: pageNumber,
        perpage: 5,
      },
    }).then((response) => {
      const data = response.data
      if (data.users.length) {
        pages.value = data.meta.pages
        currentPage.value = data.meta.current_page

        // Remove the previous users
        usersStore.$patch({ users: [] })
        updateUser(data.users)
      }
    })
  }

  const users = computed(() => {
    return store.users.value
  })

  return {
    users,
    currentPage,
    pages,
    handlePagination,
    initialFetch,
  }
}
