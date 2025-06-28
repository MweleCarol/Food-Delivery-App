import mongoose from "mongoose";

export const connectDb = async ()=> {
    await mongoose.connect('mongodb+srv://devmaniac:devmaniac254@cluster0.dtzqnnq.mongodb.net/foodDelivery').then(()=>console.log("DB connected"));

}