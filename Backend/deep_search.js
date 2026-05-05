import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const deepSearch = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        
        for (const dbInfo of dbs.databases) {
            const dbName = dbInfo.name;
            if (['admin', 'local', 'config'].includes(dbName)) continue;
            
            console.log(`\n--- DB: ${dbName} ---`);
            const db = mongoose.connection.client.db(dbName);
            const collections = await db.listCollections().toArray();
            
            for (const col of collections) {
                const count = await db.collection(col.name).countDocuments();
                console.log(`Collection: ${col.name} (${count} docs)`);
                if (col.name.toLowerCase().includes('user')) {
                    const docs = await db.collection(col.name).find().toArray();
                    console.log("Emails:", docs.map(d => d.email || d.fullname));
                }
            }
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

deepSearch();
