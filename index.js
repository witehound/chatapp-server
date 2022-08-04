import express from "express";
import cors from "cors";
import "dotenv/config";
import { nanoid } from "nanoid";
import io from "./utils/socketio.js";

const app = express();
app.use(cors());
const port = process.env.PORT;

const users = [];
const rooms = [];

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
