const { Schema, model } = require('mongoose')
// const { Gender } = require('../helpers/constants')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 8
const gr = require('gravatar')

const userSchema = new Schema(
  {
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/g
        return re.test(String(value).toLowerCase())
      },
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: { type: String, default: null },
    name: { type: String, minlength: 2, default: 'Guest' },
    avatarURL: {
      type: String,
      default: function () {
        return gr.url(this.email, { s: '250' }, true)
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
