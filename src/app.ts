import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  SocketData,
  ClientToServerEvents,
  InterServerEvents,
  Room,
  Rooms,
  ServerToClientEvents,
  Message,
  Messages,
} from "./interfaces/socket.io";
import { nanoid } from "nanoid";

const PORT = 4000;

const app: Express = express();

const httpServer = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const rooms: Rooms = {};
const messages: Messages = [];

io.on("connection", (socket) => {
  console.log(socket.id, "was connected");

  socket.emit("ROOM_LIST", rooms);

  socket.on("CREATE_ROOM", (room: Room) => {
    console.log(`${room.title} Room was created.`);

    const roomId = nanoid();

    rooms[roomId] = room;

    socket.emit("ROOM_LIST", rooms);

    socket.join(roomId);

    socket.emit("JOINED_ROOM", roomId);
  });

  socket.on("JOIN_ROOM", (room: Room) => {
    console.log("join room");
  });

  socket.on("SEND_CELB_MESSAGE", (message: Message) => {
    console.log(`${message.username} send message: ${message.content}`);
    messages.push(message);

    socket.emit("RECIEVED_CELB_MESSAGE", message);
  });

  socket.on("SEND_FAN_MESSAGE", (data: Message) => {
    console.log(`${data.username} send message: ${data.content}`);

    socket.emit("RECIEVED_FAN_MESSAGE", data);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });
});

httpServer.listen(PORT, () => {
  console.log(`
################################################
     🛡️  Server listening on port: ${PORT}🛡️
################################################

`);
});
