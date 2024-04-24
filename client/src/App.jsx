import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import { Home } from './screens/Home/Home'
import { UserData } from './screens/UserData/UserData'
import { Main } from './screens/Main/Main'
import { Score } from './screens/Score/Score'

function App () {
  const [currentPage, setCurrentPage] = useState('main')
  const [morseCode, setMorseCode] = useState('')
  const [user, setUser] = useState({ name: '', email: '' })
  const [userScore, setScoreUser] = useState(0)

  useEffect(() => {
    const socket = io.connect('http://localhost:3000', { path: '/real-time' })

    socket.emit('player-connected')

    socket.on('pressed', (data) => {
      console.log('llega la data:', data)
      setMorseCode(prevMorseCode => prevMorseCode + data)
      console.log('morseCode:', morseCode)
    })

    if (currentPage === 'score') {
      const userData = {
        name: user.name,
        email: user.email,
        score: userScore
      }
      socket.emit('user-data', userData)
    }

    return () => {
      socket.disconnect()
    }
  }, [currentPage])

  return (
    <div className='app'>
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'user-data' && <UserData setCurrentPage={setCurrentPage} user={user} setUser={setUser} />}
      {currentPage === 'main' && <Main setCurrentPage={setCurrentPage} morseCode={morseCode} setMorseCode={setMorseCode} userScore={userScore} setUserScore={setScoreUser} />}
      {currentPage === 'score' && <Score userScore={userScore} />}
    </div>
  )
}

export default App
