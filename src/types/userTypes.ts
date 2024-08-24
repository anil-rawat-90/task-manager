// Define a type or interface for a User
export interface UserType {
    _id?: string; // Optional field, MongoDB-generated ID
    username: string;
    email: string;
    password: string; // Password should be hashed in practice, not stored as plain text
    createdAt?: Date; // Optional field, MongoDB-generated timestamp
    updatedAt?: Date; // Optional field, MongoDB-generated timestamp
}
