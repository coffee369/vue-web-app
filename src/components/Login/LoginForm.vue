<script setup lang="ts">
import useLogin from './useLogin'
import { UserLoginSchema } from '@/types/user'
import ButtonShared from '../Button/ButtonShared.vue'
import InputText from '../Input/InputText.vue'
import { Form } from 'vee-validate'
import Alert from '../Alert/Alert.vue'
import AlertError from '../Alert/AlertError.vue'

const { values, isLoading, errorAPI, handleSubmit } = useLogin()
</script>

<template>
  <div class="mx-auto max-w-[600px]">
    <AlertError :message="errorAPI" v-if="errorAPI" />

    <Form @submit="handleSubmit" :validation-schema="UserLoginSchema">
      <InputText
        label="Email"
        placeholder="Your Email Address"
        name="email"
        inputType="text"
        v-model:value="values.email"
      />

      <InputText
        label="Password"
        placeholder="Your password"
        name="password"
        inputType="password"
        v-model:value="values.password"
      />

      <div class="mb-6 text-center">
        <ButtonShared :is-disable="isLoading">Submit</ButtonShared>
      </div>
    </Form>
  </div>
</template>
