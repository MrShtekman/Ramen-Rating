import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';


let mockDb: MongoMemoryReplSet | null = null;

export const mockDbConnect = async () => {
    try {
        console.log("Connecting to in-memory MongoDB...");
        if (!mockDb) {
            mockDb = await MongoMemoryReplSet.create({
                replSet: { count: 4 },
                debug: true,
            });
        }
        const uri = mockDb.getUri();
    
        if (mongoose.connection.readyState !== 0) {
            console.log("In-memory MongoDB already connected, disconnecting...");
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
            console.log("Successfully disconnected in-memory MongoDB");
        } catch (error: any) {
            if(error.code === "ECONNRESET")
                console.log("ECONNRESET error occured during MongoDB shutdown.");
            else
            console.error("Error disconnecting from in-memory MongoDB:", error);
        }
    }
}
