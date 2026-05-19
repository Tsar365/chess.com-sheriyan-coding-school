const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");
const { title } = require("process");

const app = express();

const server = http.createServer(app);
const io = socket(server); //Attaches Socket.IO to your HTTP server.Now the server can support live connections.

const chess = new Chess();
let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Chess Game" });
});

// io.on("connection", (uniqueSocket) => { //[User connects to server] This runs EVERY TIME a new browser connects.“Hey server, listen for new user connections.”When someone connects: callback function runs“ When a player connects, create a private session for them and manage everything they do (join, move, disconnect).” Each player gets their own uniqueSocket.
//   console.log("A user connected: " + uniqueSocket);
//   uniqueSocket.on("joinGame", () => {  //“This specific user sent joinGame”.[Server listens from that user] Server listens for an event called: "joinGame" sent by THIS specific user.
//     console.log("Player joined: ");
//     io.emit("playerJoined")  //server broadcasts to all clients that a player has joined [Server broadcasts] Server sends event:"playerJoined" to ALL connected users.

// })

// uniqueSocket.on("disconnect", () => {
//     console.log("A user disconnected: " + uniqueSocket);
// })


// });
io.on("connection", (uniqueSocket) => { //[User connects to server]
  console.log("A user connected: ");

  if (!players.white) {
    players.white = uniqueSocket.id;
    uniqueSocket.emit("playerRole", "w"); //socket.emit(eventName, data)
  } else if (!players.black) {
    players.black = uniqueSocket.id;
    uniqueSocket.emit("playerRole", "b");
  } else {
    uniqueSocket.emit("spectatorRole");
  }

// Disconnect handling:

  uniqueSocket.on("disconnect", () => { //socket.on(eventName, callback)
    if (uniqueSocket.id === players.white) {
      delete players.white;
    } else if (uniqueSocket.id === players.black) {
      delete players.black;
    }
  })

// Move event listen:

  uniqueSocket.on("move", (move) => { //move store the data. Structure: socket.on("move", moveData)

    try {
      if (chess.turn() === "w" && uniqueSocket.id !== players.white)
        return;
      if (chess.turn() === "b" && uniqueSocket.id !== players.black)
        return;

      const result = chess.move(move); //“Chess.js দিয়ে move process করো”

      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);//“সব connected browser কে বলো move হয়েছে।”
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid move: ", move);
        uniqueSocket.emit("invalidMove", move);
      }
    } catch (err) {
      console.log(err);
      uniqueSocket.emit("invalidMove", move);
    }
  })

});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});


// io Means:
// Entire server communication system

// "connection" Means:
// "Someone connected"