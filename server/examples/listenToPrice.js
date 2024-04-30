const { json } = require('express');
const WebSocket = require('ws');

// Generate a random session ID
function generateSession() {
    const stringLength = 12;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const randomString = Array.from({ length: stringLength }, () =>
        letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');
    return 'qs_' + randomString;
}

// Prepend header to content
function prependHeader(content) {
    return `~m~${content.length}~m~${content}`;
}

// Construct a JSON message
function constructMessage(func, paramList) {
    return JSON.stringify({ m: func, p: paramList });
}

// Create a full message with header
function createMessage(func, paramList) {
    return prependHeader(constructMessage(func, paramList));
}

// Send a message over the WebSocket connection
function sendMessage(ws, func, args) {
    ws.send(createMessage(func, args));
}

// Send a ping packet
function sendPingPacket(ws, result) {
    const pingStr = result.match(/.......(.*)/)[1];
    if (pingStr) {
        ws.send(`~m~${pingStr.length}~m~${pingStr}`);
    }
}

// Handle WebSocket messages
function socketJob(appWs, ws) {

    ws.on('message', (result) => {
        try {
            if (result.includes('quote_completed') || result.includes('session_id')) {
                return;
            }
            const res = result.match(/^.*?({.*)$/);
            if (res) {
                const jsonRes = JSON.parse(res[1]);
                if (jsonRes.m === 'qsd') {
                    const prefix = jsonRes.p[1];
                    const symbol = prefix.n;
                    const price = prefix.v.lp || null;
                    // console.log(`${symbol} -> price=${price}`);
                    appWs.send(JSON.stringify({code: 2, results: {symbol, price}}))
                }
            } else {
                sendPingPacket(ws, result);
            }
        } catch (error) {
            
        }
    });
}

// Main function to establish WebSocket connection and start job
function listenToPriceWs(appWs, symbols) {
    const tradingViewSocket = 'wss://data.tradingview.com/socket.io/websocket';
    const headers = { Origin: 'https://data.tradingview.com' };
    const ws = new WebSocket(tradingViewSocket, { headers });
    const session = generateSession();
    ws.on('open', () => {
        sendMessage(ws, 'quote_create_session', [session]);
        sendMessage(ws, 'quote_set_fields', [session, 'lp']);
        sendMessage(ws, 'quote_add_symbols', [session, ...symbols]);
    });

    appWs.on('close', () => {
        ws.close()
    })
    socketJob(appWs, ws);
}


module.exports = listenToPriceWs;