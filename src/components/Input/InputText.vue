<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import type { PropType } from 'vue'

type InputType = 'text' | 'number' | 'password' | 'email' | undefined

defineEmits(['update:value'])

defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  name: {
    type: String,
    required: false,
    default: '',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  inputType: {
    type: String as PropType<InputType>,
    default: 'text',
  },
})
</script>

<template>
  <div class="mb-6">
    <label class="block mb-2 text-grass12" :for="name">
      {{ label }}
    </label>
    <Field
      :type="inputType"
      :name="name"
      :placeholder="placeholder"
      v-model="value"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
      class="bg-grass3 text-white border-2 w-full border-transparent focus:outline-none focus:border-grass8 focus:bg-grass4"
    />
    <div>
      <ErrorMessage :name="name" class="text-red-400" />
    </div>
  </div>
</template>

<style scoped>
input[type='text'],
input[type='password'],
input[type='email'] {
  box-shadow: none;
}
</style>
