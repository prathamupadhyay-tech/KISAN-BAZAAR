import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    quantity:{
        type : Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
        required:true
    },
    basePrice:{
        type:String,
        required:true,
    },
    currentBid:{
        type:String,
        default:0
    },
    currentBidder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Buyer"
    },
    AuctionEndTime:{
        type: String,
        required:true
    },
    bidEnded:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        
    },
    category:{
        type:String,
        required:true
    },
    rated:{
        type:Boolean,
        default : false
    }
},{timestamps:true});



export default mongoose.model("Product", productSchema);