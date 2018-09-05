const websocket = require("ws");
const EventEmitter = require("events");
const ws = new websocket("https://gateway.discord.exchange");
var currencies; //eslint-disable-line
class ExchangeClient extends EventEmitter {
    constructor(token, botID) {
        super();
        this.token = token;
        this.botID = botID;
    }
    authenticate() {
        var sendData = JSON.stringify({
            "op": 1,
            "data": {
                "token": this.token
            }
        });
        ws.send(sendData);
    }
    initiateTransaction(user, recipient, amout) { //eslint-disable-line no-unused-vars

    }
}

function messageHandler(data) {
    var oData = JSON.parse(data);
    var op = oData.op;
    switch (op) {
        case 1:
            if (!oData.d.success) {
                const err = oData.d.message;
                ExchangeClient.emit("AuthUnsuccessful", err);
                break;
            }
            ExchangeClient.emit("AuthSuccessful");
            break;
        default:
            ExchangeClient.emit("UnknownMessage");
            break;
    }
}

ws.on("message", function (data) {
    messageHandler(data);
});


module.exports = ExchangeClient;