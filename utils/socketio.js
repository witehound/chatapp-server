import { createServer } from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";

const httpServer = createServer();
const options = {
  cors: {
    origin: "*",
  },
};

const io = new Server(httpServer, options);

const users = [];
const rooms = [];

const startIo = () => {
  io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    users.push(socket.id);
    socket.broadcast.emit("updateUsers", users);

    socket.on("disconnect", () => {
      users = users.filter((user) => (user = !socket.id));
      socket.broadcast.emit("updateUsers", users);
      socket.disconnect();
    });

    socket.emit("getAllUsers", users);

    socket.on("createRoom", () => {
      const room = {
        id: nanoid(7),
        chat: [],
      };

      socket.join(room);
      socket.emit("getRoom", room);
      rooms.push(room);
      socket.broadcast.emit("updateRooms", rooms);
    });

    socket.on("joinRoom", (room) => {
      socket.join(room);
    });
    socket.broadcast.emit("updateRooms", rooms);

    socket.on("message", (payload) => {
      rooms.map((room) => {
        if (room.id === payload.room) {
          singleChat = { message: payload.message, writer: payload.socketId };
          room.chat.push(singleChat);
        }
      });
      io.to(payload.room).emit("chat", payload);
    });
  });
};

export default startIo;
