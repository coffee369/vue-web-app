<script setup lang="ts">
import ButtonShared from '@/components/Button/ButtonShared.vue'
import InputText from '@/components/Input/InputText.vue'
import useProfilePassword from '@/components/Profile/useProfilePassword'
import { UserPasswordSchema } from '@/types/user'
import { Form } from 'vee-validate'
import Alert from '../Alert/Alert.vue'
import AlertError from '../Alert/AlertError.vue'
import H3 from '../Headings/H3.vue'
import LayoutProfile from '../Layout/LayoutProfile.vue'

const { values, errorAPI, isLoading, isOpen, handleSubmit } =
  useProfilePassword()
</script>

<template>
  <LayoutProfile>
    <H3>Change Password</H3>

    <Alert message="Success" v-if="isOpen" />
    <AlertError :message="errorAPI" v-if="errorAPI" />

    <Form @submit="handleSubmit" :validation-schema="UserPasswordSchema">
      <InputText
        label="Old Password"
        placeholder="Old Password"
        name="oldPassword"
        inputType="password"
        v-model:value="values.oldPassword"
        is-required
      />

      <InputText
        label="New Password"
        placeholder="New Password"
        name="newPassword"
        inputType="password"
        :value="values.newPassword"
        @update:value="(newValue) => (values.newPassword = newValue)"
        is-required
      />

      <ButtonShared :is-disable="isLoading">Update Password</ButtonShared>
    </Form>
  </LayoutProfile>
</template>
