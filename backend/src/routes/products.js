import express  from "express";
const productRouter = express.Router();
import { isSignedIn, isValidBuyer } from "../middleware/middleware.js";
import { getActiveSellerProducts ,getInactiveSellerProducts ,addProduct ,getInactiveBuyerProducts, getActiveBuyerProducts, getActiveProductsByCategory , getProductById, boughtProducts,rateProducts } from "../controller/products.js";
import { isValidSeller } from "../middleware/middleware.js";
import { upload } from "../middleware/middleware.js";
productRouter.get("/seller/activeProducts" ,isSignedIn , isValidSeller, getActiveSellerProducts);
productRouter.get("/seller/inactiveProducts" ,isSignedIn , isValidSeller, getInactiveSellerProducts);
productRouter.post("/seller/addProduct" ,isSignedIn , isValidSeller,upload.single("image"), addProduct);
productRouter.get("/buyer/activeProducts" ,isSignedIn , isValidBuyer, getActiveBuyerProducts);
productRouter.get("/buyer/inactiveProducts" ,isSignedIn , isValidBuyer ,getInactiveBuyerProducts);
productRouter.get("/buyer/activeProducts/:category" ,isSignedIn , isValidBuyer , getActiveProductsByCategory);
productRouter.get("/buyer/activeProducts/product/:id" ,isSignedIn , isValidBuyer , getProductById);
productRouter.get("/buyer/cart",isSignedIn , isValidBuyer , boughtProducts);
productRouter.post("/buyer/rateIt",isSignedIn , isValidBuyer , rateProducts);



export default productRouter;