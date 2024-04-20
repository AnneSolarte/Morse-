import { useState } from 'react'
import './App.css'
import { Home } from './screens/Home/Home'
import { UserData } from './screens/UserData/UserData'
import { Main } from './screens/Main/Main'

function App () {
  const [currentPage, setCurrentPage] = useState('user-data')

  return (
    <div>
      {currentPage === 'home' && <Home />}
      {currentPage === 'user-data' && <UserData />}
      {currentPage === 'main' && <Main />}
    </div>
  )
}

export default App
