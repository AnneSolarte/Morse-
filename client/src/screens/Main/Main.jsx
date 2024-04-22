import { useEffect, useState } from 'react'
import './Main.css'
import { Message } from './Message/Message'
import PropTypes from 'prop-types'

export const Main = ({ setCurrentPage, morseCode, setMorseCode, setUserScore, userScore }) => {
  const [currentLetter, setCurrentLetter] = useState(null)
  const [currentWord, setCurrentWord] = useState('')
  const [state, setState] = useState('writing')
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentIndexWord, setCurrentIndexWord] = useState(0)
  const [currentIndexLetter, setCurrentIndexLetter] = useState(0)
  const [currentWordLetters, setCurrentWordLetters] = useState([])

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
  ]

  // const levels = {
  //   "Nivel1": [
  //     "Te", "Tia", "Tina", "Nina", "Nieta", "Mate", "Tema", "Misa", "Seta", "Antes", "Tinta", "Oso", "Sano", "Risa"
  //   ],
  //   "Nivel2": [
  //     "Dos", "Dado", "Casa", "Arco", "Giro", "Goma", "Una", "Cuna", "Horas", "Huerto", "Lima", "Alita", "Feo", "Cafe", "Piano", "Opera", "Vida", "Uva"
  //   ],
  //   "Nivel3": [
  //     "Wify", "Yuca", "Barco", "Bien", "Camboya", "Kiwi", "Rock", "Kiosco", "Jaula", "Joya", "Marisco", "Grave", "Taxi", "Boxeo", "Bohemio", "Queso", "Quiebra", "Zapato", "Gozar"
  //   ]
  // };

  const levels = {
    Nivel1: [
      'Te'
    ],
    Nivel2: [
      'Dos'
    ],
    Nivel3: [
      'Wify'
    ]
  }
  useEffect(() => {
    const level = 'Nivel' + currentLevel
    const levelArray = levels[level]
    const currentWordInit = levelArray[currentIndexWord]
    setCurrentWord(currentWordInit)

    const arrayLetters = currentWordInit.split('').map(letter => letter.toUpperCase())
    setCurrentWordLetters(arrayLetters)

    const letter = arrayLetters[currentIndexLetter]
    setCurrentLetter(letter)

    setMorseCode('') // Esto podría no ser necesario aquí, depende de tu lógica
  }, [])

  useEffect(() => {
    if (currentLetter) {
      const morseCodeClean = morseCode.trim().toLowerCase().replace(/[^.-]/g, '') // Limpiar morseCode
      console.log(morseCodeClean)

      console.log('Current letter', currentLetter)
      // Buscar la letra 'A' en el arreglo morseLetters
      console.log(typeof currentLetter)
      const letter = morseLetters.find(letter => letter.letter === currentLetter)

      // Acceder al código morse de la letra 'A'
      const morseCurrentLetter = letter.morse

      console.log('morse letter', morseCurrentLetter)
      console.log('Letter', currentLetter, 'morse', morseCurrentLetter)

      if (morseCodeClean.length === morseCurrentLetter.length) {
        console.log('Misma longitud')

        if (morseCodeClean === morseCurrentLetter) {
          console.log('in useEffect correct')
          setState('correct')
          setUserScore(prevScore => prevScore + 1)
          nextLetter()
        } else {
          console.log('in useEffect incorrect')
          setState('incorrect')
          nextLetter()
        }
      }
    }
  }, [morseCode, currentLetter])
  const nextLetter = () => {
    const indexLetter = currentIndexLetter + 1
    console.log('indexLetter', indexLetter)

    // Verificar si hemos llegado al final de la palabra actual
    if (indexLetter < currentWordLetters.length) {
      console.log('Encontrar la siguiente letra')
      setCurrentIndexLetter(indexLetter)
      const nextLetter = currentWordLetters[indexLetter]
      console.log('Siguiente letra:', nextLetter)
      setCurrentLetter(nextLetter)
    } else {
      console.log('Final de la palabra actual, pasando a la siguiente palabra')
      setCurrentIndexLetter(0)
      setCurrentLetter('')

      // Si ya estamos al final de la palabra, avanzamos a la siguiente palabra
      console.log('Next index Word', currentIndexWord + 1)
      setCurrentIndexWord(currentIndexWord + 1)
      const level = 'Nivel' + currentLevel
      const levelArray = levels[level]
      const nextWord = levelArray[currentIndexWord + 1] // Aquí cambiamos currentIndexWord a currentIndexWord + 1
      console.log('Next word', nextWord)

      if (nextWord) {
        console.log('Siguiente palabra:', nextWord)
        setCurrentWord(nextWord)

        const arrayLetters = nextWord.split('').map(letter => letter.toUpperCase())
        console.log(arrayLetters)
        setCurrentWordLetters(arrayLetters)

        // Reiniciamos el índice de la letra a cero para la nueva palabra
        setCurrentIndexLetter(0)

        // Actualizamos currentLetter después de establecer currentWordLetters
        const nextLetter = arrayLetters[0]
        console.log('Siguiente letra:', nextLetter)
        setCurrentLetter(nextLetter)
      } else {
        console.log('Final del nivel, pasando al siguiente nivel')

        // Si no hay más palabras en el nivel actual, avanzamos al siguiente nivel
        setCurrentLevel(currentLevel + 1)
        const nextLevel = 'Nivel' + (currentLevel + 1)
        console.log('Siguiente nivel:', nextLevel)

        // Verificar si hay un siguiente nivel
        if (levels[nextLevel]) {
          // Reiniciamos el índice de la palabra a cero para el nuevo nivel
          setCurrentIndexWord(0)
          setCurrentWord('')

          // Obtenemos la primera palabra del nuevo nivel
          const firstWord = levels[nextLevel][0]
          console.log('Primera palabra del siguiente nivel:', firstWord)
          setCurrentWord(firstWord)

          // Actualizamos el arreglo de letras de la palabra actual
          const arrayLetters = firstWord.split('').map(letter => letter.toUpperCase())
          console.log(arrayLetters)
          setCurrentWordLetters(arrayLetters)

          // Reiniciamos el índice de la letra a cero para la nueva palabra
          setCurrentIndexLetter(0)

          // Establecemos la primera letra como currentLetter
          const firstLetter = arrayLetters[0]
          console.log('Primera letra de la nueva palabra:', firstLetter)
          setCurrentLetter(firstLetter)
        } else {
          alert('No hay más niveles')
          console.log('No hay más niveles disponibles')
          setCurrentPage('score')
          // Aquí puedes manejar lo que quieres hacer cuando no haya más niveles disponibles
        }
      }
    }

    // Reiniciar el código Morse y el estado a 'writing'
    setMorseCode('')
    setState('writing')
  }

  return (
    <div className='main-div'>
      <h1 className='title'>MORSE CODE</h1>
      <h2>Score: {userScore} </h2>
      <h2>Level: {currentLevel} </h2>
      <h2 className='current-word'>{currentWord}</h2>

      <h1 className='current-letter'>{currentLetter}</h1>

      <div className='morse-code-container'>
        {morseCode.split('').map((char, index) => {
          if (char === '.') {
            return <span key={index} className='morse-dot'>.</span>
          } else if (char === '-') {
            return <span key={index} className='morse-dash'>_</span>
          }
          return null
        })}
      </div>

      {state === 'correct' && (
        <Message type='correct' text='Correct' />
      )}

      {state === 'incorrect' && (
        <Message type='incorrect' text='Incorrect' />
      )}

    </div>
  )
}

Main.propTypes = {
  setCurrentPage: PropTypes.func,
  setMorseCode: PropTypes.func,
  setUserScore: PropTypes.func,
  morseCode: PropTypes.string,
  userScore: PropTypes.number
}
