import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import userRouter from "./routes/auth.js";
import productRouter from "./routes/products.js";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Products from "./models/products.js";
import Seller from "./models/seller.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ca84dgx.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => console.log("CONNECTION SUCCESSFULL"))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
//   });
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRouter); //SignIn/SignUp Normal Users
app.use("/api", productRouter);

io.on("connect", (socket) => {
  socket.on("testing", (str) => console.log(str));
  socket.on("productSold", async (product) => {
    io.emit("productSold", product);
    try {
      await Products.findOneAndUpdate({ _id: product._id }, { bidEnded: true });
      await Seller.findOneAndUpdate(
        { _id: product.owner._id },
        {
          earnings:
            parseInt(product.owner.earnings) + parseInt(product.currentBid),
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("send_current_bid", async (data) => {
    console.log(" hello bidder" + data.currentBidder);
    io.emit("update_current_bid", data);
    try {
      await Products.findByIdAndUpdate(
        { _id: data.id },
        { currentBid: data.inputValue, currentBidder: data.currentBidder }
      );
    } catch (error) {
      console.log(error);
    }
  });
});
httpServer.listen(process.env.PORT || 5000, () => {
  console.log("Listening");
});
