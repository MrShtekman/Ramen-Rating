import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

let mockDb: MongoMemoryReplSet | null = null;

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const mockDbConnect = async () => {
    try {
        console.log("Connecting to in-memory MongoDB...");
        if (!mockDb) {
            mockDb = await MongoMemoryReplSet.create({
                replSet: { count: 1 },
                debug: true,
            });
        }
        const uri = mockDb.getUri();
        console.log("MongoDB URI:", uri);
        await sleep(2000);
    
        if (mongoose.connection.readyState !== 0) {
            console.log("MongoDB already connected, disconnecting...");
            await mongoose.disconnect();
        }
    
        await mongoose.connect(uri);
        console.log("Connected to in-memory MongoDB");
    } catch (error) {
        console.error("Error connecting to in-memory MongoDB:", error);
    }
}

export const mockDbDisconnect = async () => {
    if(mockDb) {
        try {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await mongoose.disconnect();
            await mockDb.stop();
            mockDb = null;
        } catch (error) {
            console.error("Error disconnecting from in-memory MongoDB:", error);
        }
    }
}
