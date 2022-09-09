import useAPI from '@/hooks/useAPI'
import useDialog from '@/hooks/useDialog'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { UserEmailSchema, type EmailTokenResponse } from '@/types/user'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

export default function useProfileEmail() {
  const { isOpen, toggleDialog } = useDialog()
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { updateEmail } = userStore
  const { logIn } = authStore

  const isLoading = ref(false)
  const errorAPI = ref('')

  const { values } = useForm({
    validationSchema: UserEmailSchema,
    initialValues: {
      email: user.value?.email ?? '',
    },
  })

  const handleSubmit = async () => {
    isLoading.value = true

    await useAPI({
      url: '/user/email',
      method: 'PATCH',
      data: {
        email: values.email,
      },
    })
      .then((response) => {
        onSuccess(response.data)
      })
      .catch((e) => {
        if (e && e.response) {
          errorAPI.value = e.response.data?.message
        }
        isLoading.value = false
      })
  }

  const onSuccess = (data: EmailTokenResponse) => {
    updateEmail(data)
    logIn(data.access_token)

    isLoading.value = false
    errorAPI.value = ''

    toggleDialog(true)

    if (!user.value) {
      return
    }

    values.email = user.value.email

    setTimeout(() => {
      toggleDialog(false)
    }, 3000)
  }

  return {
    values,
    errorAPI,
    isLoading,
    isOpen,
    handleSubmit,
  }
}
