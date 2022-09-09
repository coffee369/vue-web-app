import useAPI from '@/hooks/useAPI'
import useDialog from '@/hooks/useDialog'
import { useProfileStore } from '@/stores/profile'
import { ProfileBioSchema, type Profile } from '@/types/profile'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

export default function useProfileBio() {
  const { isOpen, toggleDialog } = useDialog()
  const profileStore = useProfileStore()
  const { profile } = storeToRefs(profileStore)
  const { addProfile } = profileStore

  const isLoading = ref(false)
  const errorAPI = ref('')

  const { values } = useForm({
    validationSchema: ProfileBioSchema,
    initialValues: {
      bio: profile.value?.bio ?? '',
    },
  })

  const handleSubmit = async () => {
    isLoading.value = true

    await useAPI({
      url: '/profile',
      method: 'PUT',
      data: {
        bio: values.bio,
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

  const onSuccess = (data: Profile) => {
    addProfile(data)

    isLoading.value = false
    errorAPI.value = ''
    toggleDialog(true)

    if (!profile.value) {
      return
    }

    values.bio = profile.value.bio as string

    setTimeout(() => {
      toggleDialog(false)
    }, 3000)
  }

  return { values, isLoading, isOpen, errorAPI, handleSubmit }
}
