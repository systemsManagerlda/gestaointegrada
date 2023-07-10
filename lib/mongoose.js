import mongoose from "mongoose";

export default function mongooseConnect() {    
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        const uri = process.env.MONGODB_URI2;
        return mongoose.connect(uri);
    }
}