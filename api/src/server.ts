import app from "./app";
import configs from "./configs/common";
import { connectDB, disconnectAll } from "./connection";

const port = configs.server.port;

await connectDB();

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


process.on('SIGINT', async () => {
  console.log('SIGINT signal received.');
  try {
    server.close(async () => {
      await disconnectAll();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error closing server:', error);
    process.exit(1);
  }
});
