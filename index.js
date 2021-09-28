const express = require('express')
const socketio = require('socket.io')
const http = require("http")
const dotenv = require("dotenv")
const db = require("./src/models")

const WebSockets = require("./src/WebSocket")
const indexRouter = require("./routes/index")

const app = express();
const server = http.createServer(app);

const { PORT } = process.env;

const port = PORT || '5000';

db.sequelize.sync();
dotenv.config();

global.io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
   }
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

global.io.on('connection', WebSockets.connection)

server.listen(port, function () {
  console.log(`App is listening on port ${port}`);
});
