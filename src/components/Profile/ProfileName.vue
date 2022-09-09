<script setup lang="ts">
import ButtonShared from '@/components/Button/ButtonShared.vue'
import InputText from '@/components/Input/InputText.vue'
import useProfileName from '@/components/Profile/useProfileName'
import Alert from '../Alert/Alert.vue'
import H3 from '../Headings/H3.vue'
import LayoutProfile from '../Layout/LayoutProfile.vue'
import { Form } from 'vee-validate'
import { UserNameSchema } from '@/types/user'

const { isOpen, values, isLoading, handleSubmit } = useProfileName()
</script>

<template>
  <LayoutProfile>
    <H3>User Profile</H3>

    <Alert message="Success" v-if="isOpen" />

    <Form @submit="handleSubmit" :validation-schema="UserNameSchema">
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

      <ButtonShared :isDisable="isLoading">Update Name</ButtonShared>
    </Form>
  </LayoutProfile>
</template>
