import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const sellerSchema = new mongoose.Schema({
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
    rating:{
        type:String,
        default:5
    },
    earnings:{
        type:String,
        default:0
    }
},{timestamps:true});

sellerSchema.virtual("fullName")
.get(function () {return `${this.firstName} ${this.lastName}`});

//Create Hash For The Password On Receiving And Store it in Database

// userSchema.virtual("password")
// .set(function(){
//     bcrypt.hash(password , 10 , function (err , hash){
//         this.hash_password = hash;
//     }); 
// })

//Verify Password
sellerSchema.methods = {
    authenticate:async function (password){
        return await bcrypt.compare(password, this.hash_password);
    }
}


export default mongoose.model("Seller",sellerSchema);