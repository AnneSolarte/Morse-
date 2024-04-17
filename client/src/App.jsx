import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [morseCode, setMorseCode] = useState('');
  const [currentLetter, setCurrentLetter] = useState({});
  const [state, setState] = useState('writing');

  const morseLetters = [
    { letter: 'A', morse: '.-' },
    { letter: 'B', morse: '-...' },
    { letter: 'C', morse: '-.-.' },
    { letter: 'D', morse: '-..' },
    { letter: 'E', morse: '.' },
    { letter: 'F', morse: '..-.' },
    { letter: 'G', morse: '--.' },
    { letter: 'H', morse: '....' },
    { letter: 'I', morse: '..' },
    { letter: 'J', morse: '.---' },
    { letter: 'K', morse: '-.-' },
    { letter: 'L', morse: '.-..' },
    { letter: 'M', morse: '--' },
    { letter: 'N', morse: '-.' },
    { letter: 'Ñ', morse: '--.--' },
    { letter: 'O', morse: '---' },
    { letter: 'P', morse: '.--.' },
    { letter: 'Q', morse: '--.-' },
    { letter: 'R', morse: '.-.' },
    { letter: 'S', morse: '...' },
    { letter: 'T', morse: '-' },
    { letter: 'U', morse: '..-' },
    { letter: 'V', morse: '...-' },
    { letter: 'W', morse: '.--' },
    { letter: 'X', morse: '-..-' },
    { letter: 'Y', morse: '-.--' },
    { letter: 'Z', morse: '--..' }
  ];

  const chooseRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * morseLetters.length);
    setCurrentLetter(morseLetters[randomIndex]);
  };

  useEffect(() => {
    const socket = io.connect('http://localhost:3000', { path: '/real-time' });
    socket.emit("player-connected");

    socket.on('pressed', (data) => {
      console.log("llega la data:", data);
      setMorseCode(prevMorseCode => prevMorseCode + data);
      console.log('morseCode:', morseCode)
    });

    // Escoger una letra aleatoria al inicio
    setMorseCode('')
    chooseRandomLetter();
    

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('in useEffect change morseCode')
    console.log('type morsecode', typeof morseCode)
    console.log('type letter', typeof currentLetter.morse)
    console.log('comparo', morseCode, 'con', currentLetter.morse)
    
    const morseCodeClean = morseCode.trim().toLowerCase().replace(/[^.-]/g, ''); // Limpiar morseCode
  
    if (currentLetter && currentLetter.morse) { // Verificar que currentLetter y currentLetter.morse no sean undefined
      if (morseCodeClean.length === currentLetter.morse.length) {
        if (morseCodeClean === currentLetter.morse) {
          console.log('in useEffect correct')
          setState('correct')
          
          setTimeout(() => {
            setMorseCode('');
            setCurrentLetter({})
            setState('writing')
            chooseRandomLetter();
          }, 500)
          
           
        } else {
          console.log('in useEffect incorrect')
          setState('incorrect')
          
          setTimeout(() => {
            setMorseCode(''); 
            setCurrentLetter({})
            setState('writing')
            chooseRandomLetter();
          }, 500)
          
        }
      }
    }
  }, [morseCode, currentLetter]);

  

  return (
    <div>
      <h1>MORSE CODE</h1>

      <h2>Write in morse the letter:</h2>
      <h2>{currentLetter.letter}</h2>


      <div className="morse-code-container">
        {morseCode.split('').map((char, index) => {

          if (char === '.') {
            return <span key={index} className="morse-dot">.</span>;
          } else if (char === '-') {
            return <span key={index} className="morse-dash">_</span>;
          }
          return null;
        })}
      </div>

      {
        state === 'correct' ? (
          <h2>Correct</h2>
        ): null
      }

{
        state === 'incorrect' ? (
          <h2>Incorrect</h2>
        ): null
      }


      
    </div>
  );
}

export default App;