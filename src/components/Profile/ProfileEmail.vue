<script setup lang="ts">
import ButtonShared from '@/components/Button/ButtonShared.vue'
import InputText from '@/components/Input/InputText.vue'
import useProfileEmail from '@/components/Profile/useProfileEmail'
import { UserEmailSchema } from '@/types/user'
import { Form } from 'vee-validate'
import Alert from '../Alert/Alert.vue'
import AlertError from '../Alert/AlertError.vue'
import H3 from '../Headings/H3.vue'
import LayoutProfile from '../Layout/LayoutProfile.vue'

const { values, errorAPI, isLoading, isOpen, handleSubmit } = useProfileEmail()
</script>

<template>
  <LayoutProfile>
    <H3>Change Email address</H3>

    <Alert
      message="Success. Please verify your email. Redirecting to homepage."
      v-if="isOpen"
    />
    <AlertError :message="errorAPI" v-if="errorAPI" />

    <Form @submit="handleSubmit" :validation-schema="UserEmailSchema">
      <InputText
        label="Email"
        placeholder="Email"
        name="email"
        inputType="email"
        v-model:value="values.email"
        is-required
      />

      <ButtonShared buttonType="submit" :is-disable="isLoading">
        Update Email
      </ButtonShared>
    </Form>
  </LayoutProfile>
</template>
