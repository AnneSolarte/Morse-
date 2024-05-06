import { useEffect, useState } from 'react'
import './Main.css'
import { Message } from '../../components/Message/Message'
import PropTypes from 'prop-types'
import morseLetters from '../../services/morseLettersData'
import levels from '../../services/levelsData'
import { NextLevelMessage } from '../../components/NextLevelMessage/NextLevelMessage'
import Timer from '../../components/Timer/Timer'

export const Main = ({ setCurrentPage, morseCode, setMorseCode, setUserScore, userScore, state, setState }) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentLetter, setCurrentLetter] = useState(null)
  const [currentWord, setCurrentWord] = useState('')
  const [currentImgMorse, setCurrentImgMorse] = useState('')
  const [currentWordIcon, setCurrentWordIcon] = useState('')
  const [currentLevel, setCurrentLevel] = useState(5)
  const [currentIndexWord, setCurrentIndexWord] = useState(0)
  const [currentIndexLetter, setCurrentIndexLetter] = useState(0)
  const [currentWordLetters, setCurrentWordLetters] = useState([])

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
    const intervalo = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
      } else {
        clearInterval(intervalo) // Detener el temporizador cuando llega a 0
      }
    }, 1000) // Ejecutar cada segundo

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo)
  }, [timeLeft]) // Dependencia de tiempoRestante ejecuta solo en el montaje inicial

  useEffect(() => {
    if (currentLetter) {
      const morseCodeClean = morseCode.trim().toLowerCase().replace(/[^.-]/g, '') // Limpiar morseCode
      console.log(morseCodeClean)
      console.log('current word', currentWord)

      console.log('Current letter', currentLetter)
      // Buscar la letra 'A' en el arreglo morseLetters
      console.log(typeof currentLetter)
      const letter = morseLetters.find(letter => letter.letter === currentLetter)

      // Acceder al código morse de la letra 'A'
      const morseCurrentLetter = letter.morse
      const morseCurrentImg = letter.img
      setCurrentImgMorse(morseCurrentImg)

      const morseCurrentWordIcon = letter.word
      setCurrentWordIcon(morseCurrentWordIcon)

      console.log('morse letter', morseCurrentLetter)
      console.log('Letter', currentLetter, 'morse', morseCurrentLetter)

      if (morseCodeClean.length === morseCurrentLetter.length) {
        console.log('Misma longitud')

        if (morseCodeClean === morseCurrentLetter) {
          console.log('in useEffect correct')
          setTimeout(() => {
            setState('correct')
            setUserScore(prevScore => prevScore + 1)
            setTimeout(() => {
              nextLetter()
            }, 800)
          }, 500)
        } else {
          console.log('in useEffect incorrect')
          setTimeout(() => {
            setState('incorrect')
            setTimeout(() => {
              nextLetter()
            }, 800)
          }, 500)
        }
      }
    }
  }, [morseCode, currentLetter])

  const nextLetter = () => {
    const indexLetter = currentIndexLetter + 1
    console.log('indexLetter', indexLetter)
    if (state === 'writing') {
      if (currentLevel === 1) {
        setTimeLeft(2)
      } else if (currentLevel === 2) {
        setTimeLeft(1)
      } else if (currentLevel === 3 | 4) {
        setTimeLeft(0)
      }
    }

    // Final de la currentWord?
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

      // Final de currentWord -> NextWord
      console.log('Next index Word', currentIndexWord + 1)
      setCurrentIndexWord(currentIndexWord + 1)
      const level = 'Nivel' + currentLevel
      const levelArray = levels[level]
      const nextWord = levelArray[currentIndexWord + 1]
      console.log('Next word', nextWord)

      if (nextWord) {
        console.log('Siguiente palabra:', nextWord)
        setCurrentWord(nextWord)

        const arrayLetters = nextWord.split('').map(letter => letter.toUpperCase())
        console.log(arrayLetters)
        setCurrentWordLetters(arrayLetters)

        setCurrentIndexLetter(0)

        // Actualizamos currentLetter después de establecer currentWordLetters
        const nextLetter = arrayLetters[0]
        console.log('Siguiente letra:', nextLetter)
        setCurrentLetter(nextLetter)
      } else {
        console.log('Final del nivel, pasando al siguiente nivel')
        setState('next-level')
        setTimeout(() => {
          setState('next-level')
          setTimeout(() => {
            // Si no hay más palabras en el nivel actual, avanzamos al siguiente nivel
            setCurrentLevel(currentLevel + 1)
            const nextLevel = 'Nivel' + (currentLevel + 1)
            console.log('Siguiente nivel:', nextLevel)

            // Verificar si hay un siguiente nivel
            if (levels[nextLevel]) {
              setState('writing')
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
              console.log('No hay más niveles disponibles')
              setCurrentPage('score')
            }
          }, 1000)
        }, 500)
      }
    }

    // Reiniciar el código Morse y el estado a 'writing'
    setMorseCode('')
    setState('writing')
  }

  return (
    <div className='main-div'>

      <div className='header-text'>
        <h2 className='score-text'>Score: {userScore} </h2>
        <h2 className='level-text'>Level: {currentLevel} </h2>
      </div>

      <Timer timeLeft={timeLeft} />

      <div className='word-div'>
        {currentWordLetters.map((letter, index) => {
          if (index === currentIndexLetter) {
            return <h1 key={index} className='word-letter-select'>{letter}</h1>
          }
          return <h1 key={index} className='word-letter'>{letter}</h1>
        })}
      </div>

      {
        (timeLeft !== 0 && state === 'writing')
          ? (
            <div className='morse-img-div'>
              <img src={currentImgMorse} />
              <h2>{currentWordIcon}</h2>
            </div>)
          : null
      }

      <div className='morse-code-container'>
        {state === 'writing' && timeLeft === 0 && (
          morseCode.split('').map((char, index) => {
            if (char === '.') {
              return <span key={index} className='morse-dot'>.</span>
            } else if (char === '-') {
              return <span key={index} className='morse-dash'>_</span>
            }
            return null
          })
        )}
      </div>

      {state === 'correct' && (
        <Message type='correct' text='Correct' />
      )}

      {state === 'incorrect' && (
        <Message type='incorrect' text='Incorrect' />
      )}

      {state === 'next-level' && (
        <NextLevelMessage level={currentLevel} />
      )}

    </div>
  )
}

Main.propTypes = {
  setCurrentPage: PropTypes.func,
  setMorseCode: PropTypes.func,
  setUserScore: PropTypes.func,
  morseCode: PropTypes.string,
  userScore: PropTypes.number,
  state: PropTypes.string,
  setState: PropTypes.func
}
