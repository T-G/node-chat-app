const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
var app = express();

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on("connection", function(socket){
    console.log("New user connected");

    socket.emit("newMessage", {
        from: "Joan",
        text: "Meet me at 8:00 today",
        createdAt: "7:00 AM"
    });

    socket.on("createMessage", function(newMessage){
        console.log("createMessage", newMessage)
    });

    socket.on("disconnect", function(){
    console.log("User disconnected.");
    });
});



server.listen(port, function(){
    console.log(`Server is up and running at ${ port }` );
});