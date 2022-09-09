import { useAuthStore } from '@/stores/auth'
import { UserLoginSchema } from '@/types/user'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import useAPI from '@/hooks/useAPI'
import { ref } from 'vue'

export default function useLogin() {
  const authStore = useAuthStore()
  const router = useRouter()

  const isLoading = ref(false)
  const errorAPI = ref('')

  const { values } = useForm({
    validationSchema: UserLoginSchema,
    initialValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async () => {
    isLoading.value = true

    await useAPI({
      url: `/auth/signin`,
      method: 'POST',
      data: {
        username: values.email,
        password: values.password,
      },
    })
      .then((r) => {
        isLoading.value = false
        authStore.logIn(r.data.access_token)
        router.push('/')
      })
      .catch((e) => {
        if (e && e.response) {
          errorAPI.value = JSON.stringify(e.response.data)
        }
        isLoading.value = false
      })
  }

  return { values, isLoading, errorAPI, handleSubmit }
}
