import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Buyer from '../models/buyer.js'
import Seller from '../models/seller.js'
const generateJWTToken = (_id, role) => {
    return jwt.sign({ _id, role}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
};
export const signUpBuyer = async(req,res,next) => {
        const {firstName ,
                lastName ,
                email ,
                address,
                state,
                password ,
        } = req.body;
     const userExists = await Buyer.findOne({email});
     if(userExists){
        return res.status(400).json({message:"User Already Exists"}); 
     } 
     else{
        try{
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTROUNDS) ,async(err , hash) => {
            if(err) return res.status(500).json({message:"Something Went Wrong"});
            let newUser,hash_password;
            hash_password = hash;
            newUser = new Buyer({firstName ,
                                    lastName ,
                                    // username :nanoid() + firstName,
                                    email,
                                    hash_password,
                                    address,
                                    state
                                    
                                }) 
                                    
        const savedUser = await newUser.save();
        const token = generateJWTToken(savedUser._id, "buyer");
        if(!savedUser) return res.status(400).json({message:"Something Went Wrong ! Please try again"});
            return res.status(201).json({token ,user: savedUser});
        });
        }catch{(err) => {return res.status(400).json({message:err})}};
     } 

}

export const signUpSeller = async(req,res,next) => {
        const {firstName ,
                lastName ,
                email ,
                address,
                password ,
                state,
        } = req.body;
     const userExists = await Seller.findOne({email});
     if(userExists){
        return res.status(400).json({message:"User Already Exists"}); 
     } 
     else{
        try{
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTROUNDS) ,async(err , hash) => {
            if(err) return res.status(500).json({message:"Something Went Wrong"});
            let newUser,hash_password;
            hash_password = hash;
            newUser = new Seller({firstName ,
                                    lastName ,
                                    // username :nanoid() + firstName,
                                    email,
                                    hash_password,
                                    address,
                                    state
                                }) 
                                    
        const savedUser = await newUser.save();
        const token = generateJWTToken(savedUser._id, "seller");
        if(!savedUser) return res.status(400).json({message:"Something Went Wrong ! Please try again"});
            return res.status(201).json({token , user : savedUser});
        });
        }catch{(err) => {return res.status(400).json({message:err})}};
     } 

}

export const signInSeller = async (req,res,next) =>{
    const {email , password} = req.body;
    const user = await Seller.findOne({email});
    if(user){
        const isPassword = await user.authenticate(password);
        if(isPassword){
            const token =  generateJWTToken(user._id , "seller");
            if(token){
                res.status(201).json({token , user});
            }
            else{
                return res.status(500).json({message:"Something Went Wrong"});
            }
        } 
        else{
            return res.status(400).json({message:"Please Enter A Valid Password"});
        }
    }
    else{
        return res.status(404).json({message:"User Does Not Exist"});
    }
}
export const signInBuyer = async (req,res,next) =>{
    const {email , password} = req.body;
    console.log(email);
    const user = await Buyer.findOne({email});
    if(user){
        const isPassword = await user.authenticate(password);
        if(isPassword){
            const token =  generateJWTToken(user._id , "buyer");
            if(token){
                res.status(201).json({token , user});
            }
            else{
                return res.status(500).json({message:"Something Went Wrong"});
            }
        } 
        else{
            return res.status(400).json({message:"Please Enter A Valid Password"});
        }
    }
    else{
        return res.status(404).json({message:"User Does Not Exist"});
    }
}