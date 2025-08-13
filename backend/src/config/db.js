import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected DATABASE SUCESSFULY");
    }   
    catch(error) {
        console.error("erros are there", error); 
        process.exit(1);
    }
}