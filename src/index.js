const websocket = require("ws");
const EventEmitter = require("events");

//Load events
const auth = require("./functions/auth");

const ws = new websocket("https://gateway.discord.exchange");
var currencies; //eslint-disable-line
class ExchangeClient extends EventEmitter {
    constructor(token, botID) {
        super();
        this.token = token;
        this.botID = botID;
    }
    authenticate() {
        return new Promise ( (resolve, reject) => {
            auth(ws, this.token, this.botID)
            .then(d => currencies = JSON.parse(d.data))
            .then(resolve())
            .catch(err => reject(err));
        });
        
    }
    initiateTransaction(user, recipient, amout) { //eslint-disable-line no-unused-vars
        
    }
}

ws.on("message", function (data) {
    JSON.parse(data);
    switch (data.op) {
        case 1:
            break;

        default:
        ExchangeClient.emit("UnknownMessage", data.message);
            break;
    }
});
module.exports = ExchangeClient;