import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 4000;

const app: Express = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "was connected");
});

httpServer.listen(PORT, () => {
  console.log(`
################################################
     🛡️  Server listening on port: ${PORT}🛡️
################################################

`);
});
