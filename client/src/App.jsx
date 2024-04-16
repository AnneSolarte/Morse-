import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [morseCode, setMorseCode] = useState('');

  useEffect(() => {
    const socket = io.connect('http://localhost:3000', { path: '/real-time' });
    socket.emit("player-connected");

    socket.on('pressed', (data) => {
      console.log("llega la data:", data);
      setMorseCode(prevMorseCode => prevMorseCode + data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>MORSE CODE</h1>
      <div className="morse-code-container">
        {morseCode.split('').map((char, index) => {

          if (char === '.') {
            return <span key={index} className="morse-dot">.</span>;
          } else if (char === '_') {
            return <span key={index} className="morse-dash">_</span>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;