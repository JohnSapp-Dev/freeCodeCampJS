import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Connected to MongoDB database ${connectionInstance.connection.host}`);
    }catch(err){
        console.error(`Connection failed ${err}`);
        process.exit(1);
    }
}

export default connectDB;