const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
  },
)

userSchema.virtual('info').get(function () {
  return `This is cat ${this.name} ${this.age} years old`
})

userSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/g
  return re.test(String(value))
})

const User = model('user', userSchema)

module.exports = User
