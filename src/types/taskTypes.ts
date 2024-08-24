export interface TaskType {
    _id?: string; // Optional field, MongoDB-generated ID
    title: string;
    description: string;
    status: "pending" | "completed"; // Enum-like status values
    createdAt?: Date; // Optional field, MongoDB-generated timestamp
    updatedAt?: Date; // Optional field, MongoDB-generated timestamp
    user: string; // Reference to the user who created the task
}
