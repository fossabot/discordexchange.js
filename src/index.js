const websocket = require("ws");
const EventEmitter = require("events");
const ws = new websocket("https://gateway.discord.exchange");
class ExchangeClient extends EventEmitter {
    constructor(token, botID) {
        super();
        this.token = token;
        this.botID = botID;
    }
    authenticate () {
        var sendData = JSON.stringify({"op": 1, "data": {"token": this.token}});
        ws.send(sendData);
    }
    initiateTransaction (user, recipient, amout) { //eslint-disable-line no-unused-vars

    }
}
async function messageHandler(data) {
    JSON.parse(data);

}
ws.on("message", function (data) {
    messageHandler(data);
});


module.exports = ExchangeClient;

