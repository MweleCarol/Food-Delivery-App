import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import foodRouter from './routes/FoodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


//app config
const app = express();


//define the port no
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());


//accessing the db

connectDb();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/", (req, res) =>{
    res.send("API Working")


})


app.listen(port, ()=> {
    console.log(`Server started on http://localhost:${port}`)
})


