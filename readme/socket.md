socket.emit("joinGame");
In the frontend client wants to join the game by declare "joingame" event.

uniqueSocket.on("joinGame", () => { 
unique means specific user. So server listen and detect from that specific user through "joinGame". 

io.emit("playerJoined")
After listen from that specific user server broadcast to all clients that a player has joined by declare "playerJoined"

socket.on("playerJoined", () => {
    console.log("A player has joined the game.");
});
After that, in the frontend browser listen by "playerJoined" and console.log that a player has joined the game.







Very Important Difference:
uniqueSocket.emit()
Send to ONE user only.
Like private message.

io.emit()
Send to EVERYONE.
Like loudspeaker announcement.






| Code           | Meaning            |
| -------------- | ------------------ |
| `emit()`       | Send message       |
| `on()`         | Listen for message |
| `socket`       | One user           |
| `io`           | Everyone           |
| `"connection"` | New user connected |







| Situation        | try-catch? |
| ---------------- | ---------- |
| Database         | ✅          |
| API call         | ✅          |
| File handling    | ✅          |
| JSON.parse       | ✅          |
|User/socket input | ✅          |
| Async/await      | ✅          |
| Simple variable  | ❌          |
| Simple math      | ❌          |
| Simple condition | ❌          |
| Normal loops     | ❌          |





1. Database query
try {
  const users = await User.find();
} catch (err) {
  console.log(err);
}

কারণ:
DB disconnected হতে পারে
query fail হতে পারে

2. API call
try {
  const response = await fetch(url);
} catch (err) {
  console.log(err);
}

কারণ:
internet problem
server down
timeout

3. File handling
try {
  fs.readFileSync("test.txt");
} catch (err) {
  console.log(err);
}

কারণ file exist নাও করতে পারে।

4. JSON.parse()
try {
  JSON.parse(data);
} catch (err) {
  console.log(err);
}

কারণ invalid JSON হলে error throw করে।

5. User input / socket input
আপনার chess example এর মতো:
try {
  chess.move(move);
} catch (err) {
  console.log(err);
}

কারণ user bad data পাঠাতে পারে।

6. Async await
try {
  const data = await axios.get(url);
} catch (err) {
  console.log(err);
}