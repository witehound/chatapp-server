import { Socket } from "dgram";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const options = {
  cors: {
    origin: "*",
  },
};

const io = new Server(httpServer, options);

export default io;
