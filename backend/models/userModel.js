import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const bookSchema = mongoose.Schema(
  {
    ISBN: {
      type: String,
      required: true,
    },
    bookRefUser: {
      type: String,
      required: true,
    },
    bookName: {
      type: String,
      required: true,
    },
    issuedAt: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    isReturn: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    rollNumber: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    books: [bookSchema],
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
