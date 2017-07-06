var socket = io();

socket.on("connect", function(){
    console.log("Connected to server");

});

socket.on("disconnect", function(){
    console.log("Disconnected from server");

});

socket.on("newMessage", function(message){
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        text: message.text
    });
    jQuery("#messages").append(html);
});

socket.on("newLocationMessage", function(message){
    var formattedLocationTime  = moment(message.createdAt).format("h:mm a"); 
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedLocationTime,
        url: message.url
    });
     jQuery("#messages").append(html);
});


// JQuery 
// e - event
jQuery("#message-form").on("submit", function(e){
    // prevents the default behaviour before the event
    // by default a submit event will go through a page refresh process 
    e.preventDefault();

    var messageTextBox = jQuery("[name=message");

    socket.emit("createMessage", {
        from: "User",
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val("");
    });
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function(){
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser.");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage",{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(error){
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location");
    })
});