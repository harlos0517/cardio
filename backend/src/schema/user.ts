import mongoose, {
  PassportLocalModel,
  PassportLocalDocument,
  PassportLocalSchema,
} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

import { User } from '@api/user'
// import { schemaRequireAll } from '@/util/schema'
import { runValidatorsOnUpdate } from '@/util/schema'

export interface UserDoc extends User, PassportLocalDocument {
  profilePhoto: Buffer
}

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false,
  },
  discordId: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^[a-z0-9_]{4,32}$/.test(v),
      message: 'Can only contain numbers, alphabets and underscore, with length of 4 to 64.',
    },
    set: (v: string) => v.toLowerCase(),
  },
  name: {
    type: String,
    required: true,
    validate: [
      {
        validator: (v: string) => v.trim().length > 0,
        message: 'Cannot be empty',
      },
      {
        validator: (v: string) => v.trim().length <= 256,
        message: 'Cannot be longer than 256 characters',
      },
    ],
    set: (v: string) => v.trim(),
  },
  profilePhoto: {
    type: Buffer,
    required: false,
  },
})


// schemaRequireAll(UserSchema)
runValidatorsOnUpdate(UserSchema)
UserSchema.plugin(passportLocalMongoose, {
  usernameField: '_id',
})

export const UserModel: PassportLocalModel<UserDoc> = mongoose.model(
  'User',
  UserSchema as PassportLocalSchema,
)
