

import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';

const app = express();

// Connect to MongoDB (wrap in try-catch for serverless)
try {
        await connectDB();
} catch (error) {
        console.error('Database connection failed:', error);
}

/**size limit increased to 50mb for larger media files
 */
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

// For Vercel serverless functions, export the app directly
export default app;