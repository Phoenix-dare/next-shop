import mongoose,{Schema,Types,model,Model} from "mongoose"



interface User {
  username:string;
  password:string;
  role:string;
}


const userSchema = new Schema<User>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
    }
  })
  const User : Model<User>= mongoose.models.User || model("User", userSchema);
  export default User
  