import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000/", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("sendMessages", (data) => {
    io.emit("recieveMessages", data);
  });
});

httpServer.listen(8000);
