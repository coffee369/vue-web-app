import { ref } from 'vue'

export default function useDialog(initialOpen = false) {
  const isOpen = ref(initialOpen)

  const toggleDialog = (value: boolean) => {
    isOpen.value = value
  }

  return { isOpen, toggleDialog }
}
