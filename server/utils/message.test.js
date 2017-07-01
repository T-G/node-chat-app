var expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message");

describe('generateMessage', () => {
   it('should generate correct message object', () => {
       var from = "Jake";
       var text = "awesome text";
       var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });

   }); 
});

describe('generateLocationMessage', () => {
    it('should generate correct geolocation object', () => {
        var from = "Jamal";
        var latitude = 12;
        var longitude = 45;
        var url = "https://www.google.com/maps?q=12,45";
        var locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(locationMessage.createdAt).toBeA("number");
        expect(locationMessage).toInclude({from, url});
    });
});