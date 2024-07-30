import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import cors from 'cors';

import routesProduct from './routes/routesProducts.js';
import routesCart from './routes/routesCarts.js';
import routesUser from './routes/routesUsers.js';
import routesMessages from './routes/routesMessages.js';
import routesView from './routes/routesViews.js';
import routesAuth from './routes/routesAuth.js';
import mockingRoutes from './routes/routesMocking.js';

import __dirname from './utils.js';
import { initializeSockets } from './dao/socketManager.js';
import initializePassport from './config/passport.config.js';
import { PORT, MONGO_URL } from './config.js';
import errorHandler from './middleware/errorHandler.js'; 

// Inicializa la aplicación de Express
const app = express();
const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const socketServer = new Server(httpServer);

// Middleware para el manejo de CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de la sesión
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
}));

// Middleware para manejar los mensajes flash
app.use(flash());

// Inicialización de Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Configuración del motor de vistas y la carpeta de archivos estáticos
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Rutas de la API
app.use('/api/products', routesProduct);
app.use('/api/carts', routesCart);
app.use('/api/users', routesUser);
app.use('/api/chat', routesMessages);
app.use('/api/sessions', routesAuth);
app.use('/api', mockingRoutes);

// Rutas para vistas
app.use('/', routesView);

// Inicializa los sockets
initializeSockets(socketServer);

// Middleware de manejo de errores
app.use(errorHandler); 
console.log("Views directory:", __dirname + "/views");
// Conexión a la base de datos
mongoose.connect(MONGO_URL)
    .then(() => { console.log("Conectado a la base de datos") })
    .catch(error => console.error("Error en la conexion", error));

export { socketServer };