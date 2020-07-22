const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require("http"); // NEW
const WebSocket = require("ws"); //NEW

const { dbConnection } = require('./database/config');

/* Crear el servidor de express */
const app = express();

/* Conexión a la BD */
dbConnection();

/* CORS - para permitir conexión entre back y front */
app.use(cors());

/* Directorio público */
app.use( express.static('public') );

/* Lectura y parsing de body */
app.use( express.json() );

/* Rutas */
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/requests', require('./routes/requests') );

const server = http.createServer(app); //NEW

const socket = require("socket.io");
const io = socket(server);

const users = {};

io.on('connection', socket => {
    socket.on("signIn", (data) => {
        if (!users[socket.id]) {
        users[socket.id] = {};
        users[socket.id].soc = socket.id;
        users[socket.id].type = data.type;
        users[socket.id].id = data.id;
        io.sockets.emit("allUsers", users);
        console.log(users);
        console.log("-----------------------")
    }
    })
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from, bo: data.bo});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
    socket.on("askPeer", (data) => {
        console.log("got this")
        io.to(data.to).emit('askPeer', {peer: data.signal});
    })
    socket.on("hungUp", (data) => {
        io.to(data.to).emit('hungUp', data.signal);
    })
    socket.on("hungUpBack", (data) => {
        io.to(data.to).emit('hungUpBack', data.signal);
    })
});


server.listen( process.env.PORT , () => {
    console.log(`>>> Server running in port ${ process.env.PORT }`);
} );

// data = {nec, subject, id, type, to}