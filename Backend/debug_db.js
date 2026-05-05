import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const debugDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Connection Name:", mongoose.connection.name);
        console.log("Connection Host:", mongoose.connection.host);
        
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log("Databases on this cluster:", dbs.databases.map(db => db.name));
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections in current DB:", collections.map(c => c.name));
        
        const userCount = await mongoose.connection.db.collection('users').countDocuments();
        console.log("Documents in 'users' collection:", userCount);
        
        const users = await mongoose.connection.db.collection('users').find().toArray();
        console.log("Actual users in DB:", users);

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

debugDB();
