import mongoose from "mongoose";

//export const connectDb = async ()=> {
//    await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB connected"))
//    .catch((error)=>console.log("DB connection error:", error));
//
//}

export const connectDb = () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables.");
    return;
  }
  
  console.log("Connecting to MongoDB...");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", (error) => {
  console.error("DB connection error:", error);

});
db.once("open", () => {
  console.log("DB connected successfully", mongoose.connection.host);
  console.log("DB name:", mongoose.connection.name);
});

};