import io from "socket.io-client";
import { useEffect, useState } from "react";
import { ReactDOM } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SellerDashboard from "./components/SellerDashboard";
import SellProduct from "./components/SellProduct";
import SellerNavbar from "./components/SellerNavbar";
import SellerProfile from "./components/SellerProfile";
import LandingPage from "./components/LandingPage.js";
import { PrivateRoutes } from "./helpers/privateRoutes.js";
import { SellerRoutes } from "./helpers/sellerRoutes.js";
import { BuyerRoutes } from "./helpers/buyerRoutes";
import BuyerProfile from "./components/BuyerProfile";
import Market from "./components/market.js/market.js";
import MarketNew from "./components/MarketNew.js";
import ProductDescription from './components/ProductDescription.js'
import BuyerCart from './components/BuyerCart.js'
import PrevAuction from './components/PrevAuction.js'
function App() {
  // const [num , setNum] = useState(0);
  // const [visual , setVisual] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  if(socket){
    socket.on("connect" , () => {
      socket.emit("testing" , `Hey i Am ${socket.id}`)
      
    })
  }

  // const handleChange = (e) =>{
  //   setNum(e.target.value);
  //   socket.emit("updatedNumVal" , e.target.value);
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/seller" element={<SellerRoutes />}>
            <Route path="/seller/SellProduct" element={<SellProduct socket = {socket}/>}></Route>
            <Route path="/seller/SoldProducts" element={<PrevAuction socket = {socket}/>}></Route>
            <Route path="*" element={<SellerProfile socket = {socket}/>}></Route>
          </Route>
        </Route>
        <Route path="/buyer" element={<BuyerRoutes />}>
          <Route path="/buyer/market" element={<MarketNew socket = {socket}/>}></Route>
          <Route path="/buyer/market/:category" element={<Market socket = {socket}/>}></Route>
          <Route path="/buyer/market/product/:id" element={<ProductDescription socket = {socket}/>}></Route>
          <Route path="/buyer/cart" element={<BuyerCart/>}></Route>
          <Route path="*" element={<BuyerProfile socket = {socket}/>}></Route>
        </Route>
        <Route path="/" exact element={<LandingPage />} />
        <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
