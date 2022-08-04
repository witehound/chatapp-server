const Generator = require("id-generator");
const nanoid = new Generator();

const createConnection = (server, Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  let users = [];
  let rooms = [];

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
      socket.join(room.id);
    });
    socket.emit("getAllRooms", rooms);
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

module.exports = createConnection;
