import Products from "../models/products.js"
import Seller from "../models/seller.js";
export const getActiveSellerProducts = async (req,res,next) => {
    const owner = req.user._id;
    try{
        const allProducts = await Products.find({owner,bidEnded:false}).populate("currentBidder").populate("owner");
        // const activeProducts = allProducts.filter((product) => !product.bidEnded);
        res.status(201).json(allProducts);
        
    }catch{
        res.status(400).json({message:"Something Went Wrong"});
    } 
}
export const getInactiveSellerProducts = async (req,res,next) => {
    const owner = req.user._id;
    try{
        const allProducts = await Products.find({owner,bidEnded:true}).populate("currentBidder").populate("owner");
        // const inactiveProducts = allProducts.filter((product) => product.bidEnded);

        res.status(201).json(allProducts);
        
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Something Went Wrong"});
    } 
}

export const addProduct = async (req,res,next) => {
    let owner = req.user._id;
    // const categoryInfo = {
    //     name : req.body.name,
    //     slug : slugify(req.body.name),
    //     parentID : req.body.parentID,
    //     categoryImage : req.file ? process.env.API + "/public" + "/" + req.file.filename : ""
    // }
    const {name , quantity , basePrice ,description, AuctionEndTime , category} = req.body;
    if(!name || !quantity  || !basePrice || !description  || !category) return res.status(400).json({message:"Something Went Wrong"});
    
    console.log(AuctionEndTime)
    
    const image =  req.file ? process.env.API + "/public" + "/" + req.file.filename : "";
    try{
        const newProduct = new Products({name , quantity ,owner , basePrice ,description , AuctionEndTime ,image ,category })
        newProduct.save((err , data) => {
            if(err){
                console.log("heyyy")
                res.status(400).json({err});
            }
            else res.status(201).json({newProduct});
        });
    }
    catch(err){
        res.status(400).json({message:"Something Went Wrong Please Try Again Later"});
    }

}

export const getActiveBuyerProducts = async (req,res,next) => {
    try{
        const allProducts = await Products.find({bidEnded : false}).populate("currentBidder").populate("owner");
        // const activeProducts = allProducts.filter((product) => product.bidEnded);
        res.status(201).json(allProducts);
        
    }catch{
        res.status(400).json({message:"Something Went Wrong"});
    } 
}
export const getInactiveBuyerProducts = async (req,res,next) => {
    try{
        const allProducts = await Products.find({bidEnded:true}).populate("currentBidder").populate("owner");
        // const inactiveProducts = allProducts.filter((product) => !product.bidEnded);
        res.status(201).json(allProducts);
        
    }catch{
        res.status(400).json({message:"Something Went Wrong"});
    } 
}

export const boughtProducts = async (req,res,next) => {
    try{
        const allProducts = await Products.find({bidEnded : true , currentBidder:req.user._id ,rated:false}).populate("currentBidder").populate("owner");
        // const bought = allProducts.filter((product) => product._id === req.user._id);
        res.status(201).json({allProducts});
    }catch(err){
        console.log(err)
        res.status(400).json({message:"Something Went Wrong Please Try Again"})
    }
}

export const getActiveProductsByCategory = async(req , res , next) => {
    const category = req.params.category;

    try{
        const allProducts = await Products.find({bidEnded:false , name:category}).populate("owner").populate("currentBidder");;
        res.status(201).json({allProducts})

    }catch(err){
        console.log(err);
        res.status(400).json({message:"Something Went Wrong"});
    }
}

export const getProductById = async (req,res,next) => {
    const id = req.params.id;
    console.log(id);
    try{
        const allProducts = await Products.find({ _id : id}).populate("owner").populate("currentBidder");
        res.status(201).json({allProducts})
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Something Went Wrong"});
    }
}

export const rateProducts = async (req,res,next) => {
    const {rating,product} = req.body;
    try{
        const newRating = Math.round((parseInt( product.owner.rating) + parseInt(rating))/2)
        console.log(newRating)
        await Seller.findOneAndUpdate({ _id:product.owner._id} , {rating : newRating });
        await Products.findOneAndUpdate({_id:product._id} , {rated:true})
        res.status(201).json({message:"Rating Updated"})
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Something Went Wrong"});
    }
}