import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mockDb: MongoMemoryServer | null = null;

export const mockDbConnect = async () => {
    if(!mockDb) {
        mockDb = await MongoMemoryServer.create();
    }
    const uri = mockDb.getUri();

    const dbOptions = {
    };

    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    await mongoose.connect(uri, dbOptions as mongoose.ConnectOptions);
}

export const mockDbDisconnect = async () => {
    if(mockDb) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mockDb.stop();
        mockDb = null;
    }
}
