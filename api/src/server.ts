import app from "./app";
import configs from "./configs/common";

const port = configs.server.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});