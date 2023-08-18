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

io.on("connection", (socket) => {
  console.log(socket.id, "was connected");

  socket.emit("ROOM_LIST", rooms);

  socket.on("CREATE_ROOM", (room: Room) => {
    console.log(`${room.title} Room was created.`);

    const roomId = nanoid();

    rooms[roomId] = room;

    io.emit("ROOM_LIST", rooms);
  });

  socket.on("JOIN_ROOM", (roomId: string) => {
    console.log("join room");

    socket.join(roomId);

    io.emit("JOINED_ROOM", roomId);
  });

  socket.on(
    "SEND_CELB_MESSAGE",
    ({ roomId, message }: { roomId: string; message: Message }) => {
      console.log(
        `${roomId}: ${message.username} send message: ${message.content}`
      );

      // socket.to(roomId).emit("RECIEVED_CELB_MESSAGE", message);
      io.to(roomId).emit("RECIEVED_CELB_MESSAGE", message);
    }
  );

  socket.on(
    "SEND_FAN_MESSAGE",
    ({ roomId, message }: { roomId: string; message: Message }) => {
      console.log(
        `${roomId}: ${message.username} send message: ${message.content}`
      );

      // socket.to(roomId).emit("RECIEVED_CELB_MESSAGE", message);
      io.to(roomId).emit("RECIEVED_FAN_MESSAGE", message);
    }
  );

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
