const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

/* Escuchar peticiones */
app.listen( process.env.PORT , () => {
    console.log(`>>> Server running in port ${ process.env.PORT }`);
} );