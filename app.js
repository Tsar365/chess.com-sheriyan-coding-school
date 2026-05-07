const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");
const { title } = require("process");

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index",{title: "Chess Game"});
});

io.on("connection", (uniqueSocket) => { //[User connects to server]
  console.log("A user connected: " + uniqueSocket);  
  uniqueSocket.on("joinGame", () => {  //“This specific user sent joinGame”.[Server listens from that user]
    console.log("Player joined: ");
    io.emit("playerJoined")  //server broadcasts to all clients that a player has joined [Server broadcasts]
})
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});