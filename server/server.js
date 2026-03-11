
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import * as messageController from './controllers/messageController.js';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production'
            ? process.env.FRONTEND_URL || "*"
            : "*",
        credentials: true
    }
});

// Attach io and userSocketMap to messageController
messageController.io = io;
messageController.userSocketMap = {};

// Connect to MongoDB (wrap in try-catch for serverless)
try {
        await connectDB();
} catch (error) {
        console.error('Database connection failed:', error);
}

app.use(express.json({limit: "50mb"}));
app.use(cors({
        origin: process.env.NODE_ENV === 'production'
                ? process.env.FRONTEND_URL || "*"
                : "*",
        credentials: true
}));

// route setup
app.use("/api/status", (req, res) => {
    res.json({ status: "Server is running", timestamp: new Date().toISOString() });
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Socket.io connection logic
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        messageController.userSocketMap[userId] = socket.id;
        // Notify all clients about online users
        io.emit("getOnlineUsers", Object.keys(messageController.userSocketMap));
    }

    socket.on("disconnect", () => {
        if (userId) {
            delete messageController.userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(messageController.userSocketMap));
        }
    });
});

// For Vercel serverless functions, export the app directly
export default app;

// For local dev, start the server with socket.io
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}