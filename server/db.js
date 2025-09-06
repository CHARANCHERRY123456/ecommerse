import mongoose from 'mongoose';

export default async function getDb(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("data base connected");
        
    } catch (error) {
        console.log("error connecting mongodb");
    }
}