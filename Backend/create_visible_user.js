import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

const createVisibleUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const uniqueEmail = `real_user_${Date.now()}@test.com`;
        const newUser = await User.create({
            fullname: "REAL USER TO FIND",
            email: uniqueEmail,
            phoneNumber: 9999999999,
            password: "Password123!",
            role: "student"
        });
        
        console.log("SUCCESS! Created user with email:", uniqueEmail);
        console.log("Please search for this email in Compass.");
        
        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

createVisibleUser();
