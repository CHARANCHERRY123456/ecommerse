import mongoose from 'mongoose';

export default async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
        console.log("✅ Database connected successfully");
        
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        console.error("Please ensure MongoDB is running and connection string is correct");
        process.exit(1); // Exit process on database connection failure
    }
}