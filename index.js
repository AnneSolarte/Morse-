const express = require('express');
const http = require("http")
const cors = require('cors');
const PORT = 3000
const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');
const Firebase = require("./firebase.js");


const app = express();
app.use(cors())
const server = http.createServer(app);

//ArduANO

const protocolConfiguration = {
  path: 'COM6',
  baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

SerialPort.list().then(
  ports => ports.forEach(port => console.log(port.path)), //COM3
  err => console.log(err)
)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.table({
      'Player:': `http://localhost:${PORT}/player`,
  });
});

app.use('/player', express.static('client'))
app.use(express.json())

//Comportamiento del servidor
const io = require('socket.io')(server, {
  path: '/real-time',
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let playersConnected = 0;


app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});


io.on('connect', (socket) => { 

    playersConnected += 1
    
    console.log("players connected:", playersConnected)

    parser.on('data', (data) => {
      console.log("this is my data", data);
      socket.emit('pressed', data);
    });
    
 

    socket.on('disconnect', () => {
      playersConnected -= 1
      console.log("Cliente desconectado:", socket.id);
    
    })
});
