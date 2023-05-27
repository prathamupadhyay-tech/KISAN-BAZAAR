import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { customInstance } from "./axios";
// import TokenVerify from "../../Hooks/tokenVerify";
export const PrivateRoutes = () => {
    const [ok , setOk] = useState(false);
    const [loading , setLoading] = useState(true);
    useEffect(() =>{
        const axios = customInstance();
        const f = async() => {
            try{
                await axios.post("/user/verify");
                
                setOk(true);
                setLoading(false);
            }
            catch(err){
                localStorage.setItem("token", null);
                localStorage.setItem("user",null);
                setLoading(false);
                
            }
        }
        f();
    },[])
    if(loading) return <h1>Loading...</h1>
    return ok ? <Outlet/> :  <Navigate to ="/"/>
} 

