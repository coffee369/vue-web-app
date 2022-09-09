<script setup lang="ts">
import type { PropType } from 'vue'

type ButtonTypes = 'button' | 'submit' | 'reset'

defineProps({
  buttonType: {
    type: String as PropType<ButtonTypes>,
    required: false,
    default: 'submit',
  },
  isDisable: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <button
    :type="buttonType"
    :disabled="isDisable"
    class="px-4 py-2 font-semibold transition duration-300 ease-in-out text-grass1 bg-grass9 hover:bg-grass10 focus:border-grass focus:shadow-outline disabled:cursor-not-allowed disabled:bg-grass5"
  >
    <slot />
  </button>
</template>
