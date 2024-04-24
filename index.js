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

let User = {
    id: 0,
    name: "",
    email: "",
    score: 0
  }


io.on('connect', (socket) => { 
  playersConnected++;
  console.log("players connected:", playersConnected);

    socket.on('user-data', async (data) => {
  
          socket.clientType = 'player'; 

          let userToCreate;

          userToCreate = 
            {
              id: socket.userId,
              name: data.name,
              email: data.email,
              score: data.score
            }
          User = userToCreate
          

          // Crear usuario en Firestore y esperar los datos actualizados
          try {
            const updatedUser = await Firebase.createUserDB(userToCreate);

            // Almacena el ID de Firebase en el objeto socket
            socket.userId = updatedUser.id; // Asumiendo que updatedUser contiene el ID de Firebase

            console.log('Enviado a Firebase y al cliente:', updatedUser);
          } catch (error) {
            console.error("Error al crear usuario en Firebase:", error);
          }
        });

    parser.on('data', (data) => {
      console.log("this is my data", data);
      socket.emit('pressed', data);
    });

    socket.on('update-score', async (score) => {
      try {
        
        // Actualizar el puntaje del usuario
        User.score = score;
    
        // Actualizar el usuario en Firestore
        await Firebase.EditUserDB(User);
    
        console.log('Puntaje actualizado para el usuario:', user);
      } catch (error) {
        console.error('Error al actualizar el puntaje del usuario:', error);
      }
    });

    socket.on('disconnect', () => {
      playersConnected -= 1
      console.log("Cliente desconectado:", socket.id);
    
    })
});
