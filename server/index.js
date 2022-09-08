const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(express.json());
app.use(cors());
 
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://socket-io-taupe.vercel.app/",
    methods: ["GET", "POST"],
  },
});;

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("sendMessages", (data) => {
    io.emit("recieveMessages", data);
  });
});

server.listen(8000);
