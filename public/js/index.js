var socket = io();

socket.on("connect", function(){
    console.log("Connected to server");

});

socket.on("disconnect", function(){
    console.log("Disconnected from server");

});

socket.on("newMessage", function(message){
    console.log("New message received. ", message);
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages").append(li);
});


// JQuery 
// e - event
jQuery("#message-form").on("submit", function(e){
    // prevents the default behaviour before the event
    // by default a submit event will go through a page refresh process 
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: jQuery("[name=message]").val()
    }, function(){

    });
});