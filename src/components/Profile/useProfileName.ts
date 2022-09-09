import { useUserStore } from '@/stores/user'
import { UserNameSchema, type InputUpdateName, type User } from '@/types/user'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import useAPI from '@/hooks/useAPI'
import useDialog from '@/hooks/useDialog'

export default function useProfileName() {
  const { isOpen, toggleDialog } = useDialog()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { updateUser } = userStore

  const isLoading = ref(false)
  const errorAPI = ref('')

  const { values } = useForm<InputUpdateName>({
    validationSchema: UserNameSchema,
    initialValues: {
      firstName: user.value?.firstName ?? '',
      lastName: user.value?.lastName ?? '',
    },
  })

  const handleSubmit = async () => {
    isLoading.value = true

    await useAPI({
      url: '/user',
      method: 'PATCH',
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
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

  const onSuccess = (data: User) => {
    updateUser(data)

    isLoading.value = false
    errorAPI.value = ''

    toggleDialog(true)

    if (!user.value) {
      return
    }

    values.firstName = user.value.firstName
    values.lastName = user.value.lastName

    setTimeout(() => {
      toggleDialog(false)
    }, 3000)
  }

  return {
    values,
    isOpen,
    isLoading,
    handleSubmit,
  }
}
