import { Schema,model,models } from "mongoose";

const UserSchema=new Schema({
    email:{
        type:String,
        unique:[true,'Email already exists'],
        required:[true,'Email is required'],
    },
    username: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9]{6,30}$/
    },
      image:{
        type:String,
      }

});

//if the backend is constantly running.
// const User=model('User',UserSchema)

// export default User 

//in nextjs its diffrent because this route will be called every time when the connection is established
const User=models.User || model('User',UserSchema)

export default User
