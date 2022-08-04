const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const createConnection = require("./utils/socketio.js");
const port = process.env.PORT;
const server = http.createServer(app);
app.use(cors());

createConnection(server, Server);

server.listen(port, () => {
  console.log("SERVER IS RUNNING ON " + port);
});
