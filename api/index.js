const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require("http"); // NEW
const WebSocket = require("ws"); //NEW

const { dbConnection } = require('./database/config');

var wsExecut = {}; //NEW, list of sockets from executives connected to the sv
var wsClient = {}; //NEW, list of sockets of clients

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
const wss = new WebSocket.Server({ server }); //NEW  ws://localhost:4000

//const wss = new WebSocket.Server({ server: app, path: "/WS" }); // NEW, quiza sea necesario crear directamente un sv http

wss.on("connection", (ws, req) => {							
  var connection = ws;										
  ws.on("message", data => {
  	data = JSON.parse(data);
  	console.log(typeof data)
  	if (data.subject && data.id && data.type) { //Los mensajes deben tener el id de la bd del usuario y el tipo
  		var uId = data.id;
  		var type = data.type;
  		if ( !(uId in wsClient) && !(uId in wsExecut)){ // Id no esta en ningun diccionario
  			if (type == "client") {
  				wsClient[uId] = connection;
  			} else {
  				wsExecut[uId] = connection;
  			}
  		}
  		console.log(2);
  		switch(data.subject) {
  			case "conAt": //Connect attempt, se debe buscar si el otro peer esta en la lista de conecciones
  			if (data.to){
  				otherId = data.to;
  				if (otherId in wsExecut && type == "client") {
  					wsExecut[otherId].send(data.nec); // se envia a la otra conexion la data necesaria
  				} else if (otherId in wsClient && type == "executive") {
  					wsClient[otherId].send(data.nec); // se envia a la otra conexion la data necesaria
  				} else { // El otro peer no esta conectado o hubo un error de conexiones
  					console.log(3);
  					ws.send("wait"); // Se pide al peer esperar por su companhero
  				}		
  			}
  			break;
		}
  	}				
  });
  ws.on("close", (code, reason) => {
  	var disc;
  	for (var id in wsClient) {
  		if (wsClient[id] == connection) {
  			disc = id;
  			delete wsClient[id];
  		}
  	}
  	for (var id in wsExecut) {
  		if (wsClient[id] == connection) {
  			disc = id;
  			delete wsClient[id];
  		}
  	}
  	console.log("Desconectada la coneccion con ", disc);
  });													
});


/* Escuchar peticiones */
//app.listen( process.env.PORT , () => {
//    console.log(`>>> Server running in port ${ process.env.PORT }`);
//} );

server.listen( process.env.PORT , () => {
    console.log(`>>> Server running in port ${ process.env.PORT }`);
} );