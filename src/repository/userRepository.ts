import User from "../models/User";
import { UserType } from "../types/userTypes"; // Adjust imports according to your project structure

export const createUser = async (userData: UserType) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error creating user: " + error.message);
        } else {
            throw new Error("Error creating user");
        }
    }
};

// Add other user-related methods
