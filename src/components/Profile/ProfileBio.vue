<script setup lang="ts">
import ButtonShared from '@/components/Button/ButtonShared.vue'
import InputText from '@/components/Input/InputText.vue'
import { ProfileBioSchema } from '@/types/profile'
import { Form } from 'vee-validate'
import Alert from '../Alert/Alert.vue'
import AlertError from '../Alert/AlertError.vue'
import H3 from '../Headings/H3.vue'
import LayoutProfile from '../Layout/LayoutProfile.vue'
import useProfileBio from './useProfileBio'

const { values, isLoading, isOpen, errorAPI, handleSubmit } = useProfileBio()
</script>

<template>
  <LayoutProfile>
    <H3>Bio</H3>

    <Alert message="Success" v-if="isOpen" />
    <AlertError :message="errorAPI" v-if="errorAPI" />

    <Form @submit="handleSubmit" :validation-schema="ProfileBioSchema">
      <InputText
        label="Bio"
        placeholder="Your Bio"
        name="bio"
        inputType="text"
        v-model:value="values.bio"
        is-required
      />

      <ButtonShared :is-disable="isLoading">Update Bio</ButtonShared>
    </Form>
  </LayoutProfile>
</template>
