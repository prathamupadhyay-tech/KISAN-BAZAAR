import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const buyerSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        max:20,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        max:20,
        trim:true
    },
    address:{
        type:String,
        trim:true,
        required:true
    },
    state:{
        type:String,
        trim:true,
        required:true
    },
    email:{
      type:String,
      required:true,
      trim:true,
      unique:true,
      lowercase:true
    },
    hash_password:{
      type:String,
      required:true
    },
    spent:{
        type:String,
        default:0
    } 
},{timestamps:true});

buyerSchema.virtual("fullName")
.get(function () {return `${this.firstName} ${this.lastName}`});

//Create Hash For The Password On Receiving And Store it in Database

// userSchema.virtual("password")
// .set(function(){
//     bcrypt.hash(password , 10 , function (err , hash){
//         this.hash_password = hash;
//     }); 
// })

//Verify Password
buyerSchema.methods = {
    authenticate:async function (password){
        return await bcrypt.compare(password, this.hash_password);
    }
}

export default mongoose.model("Buyer", buyerSchema);