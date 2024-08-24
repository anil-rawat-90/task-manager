import { Server, Socket } from "socket.io";

let io: Server; // Declare io variable

// Set up the Socket.IO server
export const setupSocket = (httpServer: any) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*", // Adjust according to your security needs
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log("A user connected");

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });

        socket.on("taskUpdate", async task => {
            console.log("Task update received:", task);
            io.emit("taskUpdated", task);
        });
    });

    return io;
};

// Export the io instance for use in other files
export { io };
