module.exports = async function (ws, userID, recipient, amount, currencies) { //eslint-disable-line
    return new Promise( (resolve, reject) => {
        const sendData = {
            
        };
        ws.send(JSON.stringify(sendData));
    });
};