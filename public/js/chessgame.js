const socket = io(); //This line creates a connection to the server.

socket.emit("joinGame"); //client send event “I want to join the game”.[User send event to server]
socket.on("playerJoined", () => { //“If server broadcast playerJoined, run this code” [Browser listens]
    console.log("A player has joined the game.");
});