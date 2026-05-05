import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

const testConnection = async () => {
    try {
        console.log("URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        const testUser = {
            fullname: "Test User",
            email: `test_${Date.now()}@example.com`,
            phoneNumber: 1234567890,
            password: "Password123!",
            role: "student"
        };
        
        const user = await User.create(testUser);
        console.log("User created successfully:", user);
        
        const foundUser = await User.findOne({ email: testUser.email });
        console.log("User found in DB:", foundUser);
        
        await mongoose.disconnect();
        console.log("Disconnected");
    } catch (error) {
        console.error("Error:", error);
    }
};

testConnection();
