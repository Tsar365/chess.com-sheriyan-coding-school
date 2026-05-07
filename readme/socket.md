socket.emit("joinGame");
In the frontend client wants to join the game by declare "joingame" event.

uniqueSocket.on("joinGame", () => { 
unique means specific user. So server listen from that specific user through "joinGame". 

io.emit("playerJoined")
After listen from that specific user server broadcast to all clients that a player has joined by declare "playerJoined"

socket.on("playerJoined", () => {
    console.log("A player has joined the game.");
});
After that, in the frontend browser listen by "playerJoined" and console.log that a player has joined the game.

