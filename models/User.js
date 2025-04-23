import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name:{type: String},
  profilepic:{type: String}
})

const User = mongoose.models.User || mongoose.model("User",UserSchema)
export default User;