import app from "./app";
import configs from "./configs/common";
import mongoose from "mongoose";

const port = configs.server.port;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const shutdown = async () => {
  console.log('Shutdown signal received.');

  try {
    console.log('Closing server...');
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.error('Error closing server:', err);
          return reject(err);
        }
        resolve();
      });
    });

    console.log('Closing MongoDB connection...');
    await mongoose.disconnect();

    console.log('Graceful shutdown complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('SIGINT signal received.');

  try {
    console.log('Closing server...');
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.error('Error closing server:', err);
          return reject(err);
        }
        console.log('Server closed.');
        resolve();
      });
    });

    console.log('Closing MongoDB connection...');
    await mongoose.connection.close(false);
    console.log('MongoDB connection closed.');

    console.log('Graceful shutdown complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', shutdown);


