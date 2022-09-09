import { UserRegisterSchema } from '@/types/user'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAPI from '../../hooks/useAPI'

export default function useRegister() {
  const isLoading = ref(false)
  const router = useRouter()
  const errorAPI = ref('')

  const { values } = useForm({
    validationSchema: UserRegisterSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const handleSubmit = async () => {
    isLoading.value = true

    await useAPI({
      url: '/auth/signup',
      method: 'POST',
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      },
    })
      .then(() => {
        isLoading.value = false
        router.push('/login')
      })
      .catch((e) => {
        if (e && e.response) {
          errorAPI.value = e.response.data?.message
        }
        isLoading.value = false
      })
  }

  return { values, isLoading, errorAPI, handleSubmit }
}
