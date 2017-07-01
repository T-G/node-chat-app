const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

var app = express();
const {generateMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on("connection", function(socket){
    console.log("New user connected");
    // socket.emit from: Admin text: welcome to the chat app

        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
        // socket.broadcast.emit from: Admin text: new user joined

        socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Joined"));

    socket.on("createMessage", function(message, callback){
        console.log("New Message ", message);

        // will emit the message to all clients
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("This is from the server");
        // will emit the message to all clients except self 
        // socket.broadcast.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on("disconnect", function(){
    console.log("User disconnected.");
    });
});



server.listen(port, function(){
    console.log(`Server is up and running at ${ port }` );
});