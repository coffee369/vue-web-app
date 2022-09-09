import useAPI from '@/hooks/useAPI'
import useDialog from '@/hooks/useDialog'
import { UserPasswordSchema, type InputPassword } from '@/types/user'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

export default function useProfilePassword() {
  const { isOpen, toggleDialog } = useDialog()

  const isLoading = ref(false)
  const errorAPI = ref('')

  const { values } = useForm<InputPassword>({
    validationSchema: UserPasswordSchema,
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  const handleSubmit = async () => {
    isLoading.value = true

    await useAPI({
      url: '/user/change-password',
      method: 'PATCH',
      data: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
    })
      .then(() => {
        onSuccess()
      })
      .catch((e) => {
        if (e && e.response) {
          errorAPI.value = e.response.data?.message
        }
        isLoading.value = false
      })
  }

  const onSuccess = () => {
    isLoading.value = false
    errorAPI.value = ''

    toggleDialog(true)

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
