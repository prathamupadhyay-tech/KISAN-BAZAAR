import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import {fileURLToPath} from 'url';
import {nanoid} from 'nanoid'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Multer Storage (File Upload)
const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , path.join(path.dirname(__dirname) , "uploads"));
    },
    filename : (req,file,cb) => {
        cb(null , nanoid() + '-' + file.originalname);
    }
})
export const upload = multer({storage})


//JWT VERIFICATION

export const isSignedIn = (req,res,next) =>{
    jwt.verify(req.headers.authorization || "Bearer", process.env.JWT_SECRET, (err, decodedUser) => {
            if(err){
                return res.status(404).json({message : "Access Denied"});
            }
            else{
                req.user = decodedUser;
                next();
            }
      });
}


export const  isValidSeller = (req,res,next) => {
    if(req.user.role === "seller" || req.user.role === "admin"){
         next();
    }
    else return res.status(404).json({message:"Unauthorized Access"});
}

export const  isValidBuyer = (req,res,next) => {
    if(req.user.role === "buyer" || req.user.role === "admin"){
         next();
    }
    else return res.status(404).json({message:"Unauthorized Access"});
}