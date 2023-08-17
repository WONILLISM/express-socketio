import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  ChatData,
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
} from "./interfaces/socket.io";

const PORT = 4000;

const app: Express = express();

const httpServer = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ChatData
>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "was connected");

  socket.on("CREATE_ROOM", (data: ChatData) => {
    console.log("Room created");

    socket.emit("JOINED_ROOM", data);
  });

  socket.on("JOIN_ROOM", (data: ChatData) => {
    console.log(`${data.username} enter the room.`);
  });

  socket.on("SEND_CELB_MESSAGE", (data: ChatData) => {
    console.log(`${data.username} send message: ${data.message}`);

    io.emit("RECIEVED_CELB_MESSAGE", data);
  });

  socket.on("SEND_FAN_MESSAGE", (data: ChatData) => {
    console.log(`${data.username} send message: ${data.message}`);

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
