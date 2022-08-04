import express from "express";
import cors from "cors";
import "dotenv/config";
import startIo from "./utils/socketio.js";

const app = express();
app.use(cors());
const port = process.env.PORT;

startIo();

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
