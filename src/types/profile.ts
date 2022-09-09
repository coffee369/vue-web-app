import { object, string, type InferType } from 'yup'

/**
 * Profile Schema
 */
const profileCore = {
  bio: string().notRequired(),
  createdAt: string().nullable(),
  updatedAt: string().nullable(),
}

export const profileSchema = object(profileCore)

export const ProfileBioSchema = profileSchema.pick(['bio'])

export type Profile = InferType<typeof profileSchema>
