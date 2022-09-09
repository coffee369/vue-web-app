<script setup lang="ts">
import { UserRegisterSchema } from '@/types/user'
import { Form } from 'vee-validate'
import AlertError from '../Alert/AlertError.vue'
import ButtonShared from '../Button/ButtonShared.vue'
import InputText from '../Input/InputText.vue'
import useRegister from './useRegister'

const { values, isLoading, errorAPI, handleSubmit } = useRegister()
</script>

<template>
  <div class="mx-auto max-w-[600px]">
    <Form @submit="handleSubmit" :validation-schema="UserRegisterSchema">
      <AlertError :message="errorAPI" v-if="errorAPI" />

      <InputText
        label="First Name"
        placeholder="First Name"
        name="firstName"
        inputType="text"
        v-model:value="values.firstName"
        is-required
      />

      <InputText
        label="Last Name"
        placeholder="Last Name"
        name="lastName"
        inputType="text"
        v-model:value="values.lastName"
        is-required
      />

      <InputText
        label="Email"
        placeholder="Email"
        name="email"
        inputType="email"
        v-model:value="values.email"
        is-required
      />

      <InputText
        label="Password"
        name="password"
        placeholder="Password"
        inputType="password"
        v-model:value="values.password"
        is-required
        :min="7"
      />

      <div class="mb-6 text-center">
        <ButtonShared :is-disable="isLoading">Submit</ButtonShared>
      </div>
    </Form>
  </div>
</template>
