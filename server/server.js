import express from 'express';
import cors from 'cors';
import "dotenv/config";
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';


const app = express();
const server = http.createServer(app);

// intialise socket io server
export const io = new Server(server, {
    cors: {
        origin: "*",
       
    }
})

// store online user in a map
export const userSocketMap = {};

// Socket.IO connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`Socket connected. UserId from query: ${userId}`);
    
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} added to userSocketMap`);
        console.log(`Current online users: ${Object.keys(userSocketMap)}`);
    }

    // Emit the list of online users to all connected clients
    const onlineUsersList = Object.keys(userSocketMap);
    console.log(`Emitting getOnlineUsers with: ${onlineUsersList}`);
    io.emit("getOnlineUsers", onlineUsersList);

    // Handle user disconnect
    socket.on("disconnect", () => {
        if (userId) {
            delete userSocketMap[userId];
            console.log(`User ${userId} disconnected`);
        }
        // Emit updated list of online users
        const updatedList = Object.keys(userSocketMap);
        console.log(`Emitting updated getOnlineUsers with: ${updatedList}`);
        io.emit("getOnlineUsers", updatedList);
    });
});

/**size limit 4 mb set ki gayi hai 
 * kyuki profile picture upload karne ke liye form data me 
 * image file bhejni hoti hai aur by default express json body parser 100kb tak ki request body ko handle karta hai, isliye limit badha kar 4mb set ki gayi hai taki user apni profile picture upload kar sake bina kisi error ke.
*/
app.use(express.json({limit: "4mb"}));
app.use(cors());

// route setup
app.use("/api/status", (req, res) => {
  res.json({ status: "Server is running" });
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// connecte to mongodb
await connectDB();

// For Vercel serverless functions, export the server directly
// Remove the conditional server.listen() as Vercel handles this
export default server;