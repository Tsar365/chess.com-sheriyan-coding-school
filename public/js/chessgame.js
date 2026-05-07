const socket = io(); //This line send request automatically to server (io.on()) to establish connection. [Client connect to server]

socket.emit("joinGame"); //client send an name "joinGame" event “I want to join the game”.[User send event to server]
socket.on("playerJoined", () => { //“If server broadcast playerJoined, run this code” [Browser listens]
    console.log("A player has joined the game.");
});