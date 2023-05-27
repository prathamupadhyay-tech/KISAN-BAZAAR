import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { customInstance } from "./axios";
// import TokenVerify from "../../Hooks/tokenVerify";
export const BuyerRoutes = () => {
    const [ok , setOk] = useState(false);
    const [loading , setLoading] = useState(true);
    useEffect(() =>{
        const axios = customInstance();
        const f = async() => {
            try{
                console.log("here");
                await axios.post("/buyer/verify");
                
                setOk(true);
                setLoading(false);
            }
            catch(err){
                setLoading(false);
                
            }
        }
        f();
    },[])
    if(loading) return <h1>Loading...</h1>
    return ok ? <Outlet/> :  <Navigate to ="/seller/profile"/>
} 

