import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: String,
  fullname: String,
  password: String,
  username: String,
  avatar: String,
})

export default mongoose.model('users', userSchema)