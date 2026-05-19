const socket = io(); //This line send request automatically to server (io.on()) to establish connection. [Client connect to server]

// socket.emit("joinGame"); //client send an name "joinGame" event “I want to join the game”.[User send event to server]
// socket.on("playerJoined", () => { //“If server broadcast playerJoined, run this code” [Browser listens]
//     console.log("A player has joined the game.");
// });
const chess = new Chess(); // Create a new chess game instance using the chess.js library
const boardElement = document.querySelector('.chessboard'); // Get the HTML element where the chessboard will be displayed


let draggedPiece = null; // Variable to keep track of the piece being dragged
let sourceSquare = null; // Variable to keep track of the source square of the dragged piece
let playerRole = null; // Variable to store the player's role (white or black)
const renderBoard = () => {
  const board = chess.board(); // Get the current state of the chessboard from the chess.js library
  boardElement.innerHTML = ''; // Clear the existing chessboard HTML
  board.forEach((row, rowIndex) => { // Loop through each row of the chessboard
    row.forEach((square, squareIndex) => { // Loop through each square in the row
      const squareElement = document.createElement('div'); // Create a new div element for the square
      squareElement.classList.add('square', (rowIndex + squareIndex) % 2 === 0 ? 'light' : 'dark'); // Add the 'square' class and a light or dark class based on the square's position
      squareElement.dataset.row = rowIndex; // Store the row index in a data attribute
      squareElement.dataset.col = squareIndex; // Store the column index in a data attribute
    });
  });
}; // Function to render the chessboard based on the current game state
const handleMove = () => { }; // Function to handle a move made by the player
const getPieceUnicode = () => { }; // Function to get the Unicode character for a chess piece based on its type and color
renderBoard(); // Initial call to render the chessboard when the page loads













const socket = io(); //This line send request automatically to server (io.on()) to establish connection. [Client connect to server]
//io() comes from this file: <script src="https://cdn.socket.io/4.8.3/socket.io.min.js"></script>

socket.emit("joinGame"); //client send an name "joinGame" event “I want to join the game”.[User send event to server]. Structure: socket.emit("eventName", data)
socket.on("playerJoined", () => { //“If server broadcast playerJoined, run this code” [Browser listens]
    console.log("A player has joined the game.");
});