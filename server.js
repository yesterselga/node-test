const express = require('express');
const app = express();
var cors = require('cors')
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
     cors: {
          origin: ["http://starserv.local:8080"],
          methods: ["GET", "POST"]
     }
});

const mysql = require('mysql');
const con = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'starserv'
});
con.connect(function (err) {
     if (err) throw err;
     console.log("DB Connected!");
});

const {
     getMessages,
     sendMessage
} = require("./db");

app.use(cors())

app.get('/', (req, res) => {
     res.sendFile(__dirname + '/index.html');
});

app.get('/messages', (req, res) => {
     getMessages(con, req.query.room, function (d) {
          res.json(d);
     });
});

io.on('connection', (socket) => {

     //socket.broadcast.emit('hi');
     socket.on('join', (data) => {
          console.log(data);
          socket.join(data.room);
     });

     socket.on('sendmessage', (data) => {
          sendMessage(con, data, function (d) {
               io.to(data.room).emit('sendmessage', data);
               console.log(d);
          });
     });

     socket.on('disconnect', () => {
          console.log('user disconnected');
     });
});

server.listen(3000, () => {
     console.log('listening on *:3000');
});