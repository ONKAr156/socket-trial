import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import Count from './model/countModel.js';


dotenv.config({ path: './.env' });
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected.');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const app = express();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(express.json());

const httpServer = createServer(app);

const io = new SocketIO(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected with socket id ' + socket.id);

    socket.on('incrementCount', async () => {
        try {
            const updatedCount = await Count.findOneAndUpdate(
                {},
                { $inc: { value: 1 } },
                { new: true, upsert: true }  
            );
            io.emit('countUpdated', updatedCount.value);
        } catch (error) {
            console.error('Error incrementing count:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected with socket id ' + socket.id);
    });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});