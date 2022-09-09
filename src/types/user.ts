import { object, string } from 'yup'
import type { InferType } from 'yup'
import { ProfileBioSchema } from './profile'

/**
 * User Schema
 */
const userCore = {
  firstName: string()
    .required()
    .min(1, 'First name should be atleast 1 character')
    .max(50),
  lastName: string()
    .required()
    .min(1, 'Last name should be atleast 1 character')
    .max(50),
  email: string()
    .email('It should be an email format')
    .required('Email is required')
    .max(50),
  password: string()
    .required()
    .min(7, 'Password should be atleast 7 characters')
    .max(50),
  id: string().nullable(),
  createdAt: string().nullable(),
  updatedAt: string().nullable(),
}

const userSchema = object(userCore)

export const UserPublicSchema = userSchema.omit(['password'])

export const UserProfileSchema = UserPublicSchema.shape({
  profile: ProfileBioSchema.optional(),
})

export const EmailTokenSchema = UserPublicSchema.shape({
  access_token: string().required(),
})

/**
 * Validation
 */

export const UserRegisterSchema = userSchema.pick([
  'firstName',
  'lastName',
  'email',
  'password',
])
export const UserLoginSchema = userSchema.pick(['email', 'password'])
export const UserNameSchema = userSchema.pick(['firstName', 'lastName'])
export const UserEmailSchema = userSchema.pick(['email'])

export const UserPasswordSchema = object({
  oldPassword: string().required().min(7).max(50),
  newPassword: string().required().min(7).max(50),
})

/**
 * Types
 */
export type User = InferType<typeof UserPublicSchema>
export type UserProfile = InferType<typeof UserProfileSchema>
export type InputPassword = InferType<typeof UserPasswordSchema>
export type InputUpdateName = InferType<typeof UserNameSchema>
export type EmailTokenResponse = InferType<typeof EmailTokenSchema>
