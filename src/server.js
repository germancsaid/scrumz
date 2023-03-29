import app from "./app";

import http from "http";

import { Server as WebsocketServer } from "socket.io";

import sockets from "./socketServer";
import { PORT } from "./config";

import { connectDB } from "./db";
connectDB();

import passport from 'passport';
// Importa la variable `sessionMiddleware` desde `app.js`
import { sessionMiddleware } from "./app";
// Crea el servidor HTTP a partir de la aplicación de Express
const server = http.createServer(app);

// Inicializa el servidor de socket.io
const io = new WebsocketServer(server);
const wrap = middleware => (socket, next) => {
  middleware(socket.request, {}, next);
};
// convert a connect middleware to a Socket.IO middleware
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));
  
io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('unauthorized'))
  }
});

// Inicia el servidor HTTP
const httpServer = server.listen(PORT);
console.log("Server running on port", PORT);

sockets(io);