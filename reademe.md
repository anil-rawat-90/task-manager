Task Management Application
Overview
This is a simple Task Management application built using the MEAN stack (MongoDB, Express, Angular, Node.js) with TypeScript for the backend. The application allows users to register, log in, create tasks, update tasks, mark tasks as complete, and delete tasks.

Prerequisites
Node.js (v14 or later)
MongoDB (Running locally or a MongoDB Atlas account)
npm or yarn
Setup
Follow these steps to set up and run the application locally.

1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/task-manager.git
cd task-manager
2. Install Dependencies
Navigate to the project directory and install the required dependencies:

bash
Copy code
npm install
or

bash
Copy code
yarn install
3. Set Up Environment Variables
Create a .env file in the root of the project and add the following environment variables:

plaintext
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret
PORT: The port on which the server will run.
MONGODB_URI: The connection string for your MongoDB instance.
JWT_SECRET: A secret key for signing JWT tokens.
4. Build the TypeScript Code
Compile the TypeScript code into JavaScript:

bash
Copy code
npm run build
or

bash
Copy code
yarn build
5. Run the Application
Start the server:

bash
Copy code
npm start
or

bash
Copy code
yarn start
6. API Endpoints
Here are the available API endpoints:

User Registration

Endpoint: POST /api/auth/register
Request Body: { "username": "testuser", "email": "testuser@example.com", "password": "password123" }
User Login

Endpoint: POST /api/auth/login
Request Body: { "email": "testuser@example.com", "password": "password123" }
Create Task

Endpoint: POST /api/tasks
Headers: Authorization: Bearer <your_jwt_token>
Request Body: { "title": "New Task", "description": "This is a new task." }
Get All Tasks

Endpoint: GET /api/tasks
Headers: Authorization: Bearer <your_jwt_token>
Update Task

Endpoint: PUT /api/tasks/:id
Headers: Authorization: Bearer <your_jwt_token>
Request Body: { "title": "Updated Task Title", "description": "Updated description.", "status": "completed" }
Delete Task

Endpoint: DELETE /api/tasks/:id
Headers: Authorization: Bearer <your_jwt_token>
Get Task by ID

Endpoint: GET /api/tasks/:id
Headers: Authorization: Bearer <your_jwt_token>
7. Run Tests
To run tests, use:

bash
Copy code
npm test
or

bash
Copy code
yarn test
8. Troubleshooting
If you encounter any issues, make sure:

MongoDB is running and accessible.
Environment variables are correctly set.
Dependencies are properly installed.
For more details on the configuration and development, refer to the documentation of Mongoose and Express.

