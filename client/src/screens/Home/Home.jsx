import './Home.css'
import name from '../../assets/name.png'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

export const Home = ({ setCurrentPage, morseCode }) => {
  useEffect(() => {
    console.log('morse code in home', morseCode)
    const morseCodeClean = morseCode.trim().toLowerCase().replace(/[^.-]/g, '') // Limpiar morseCode
    if (morseCodeClean === '.' | '-') {
      console.log('-> pasar página')
      setCurrentPage('user-data')
    }
  }, [morseCode])

  return (
    <div className='home-div'>
      <img src={name} />
      <button>START</button>
    </div>
  )
}

Home.propTypes = {
  setCurrentPage: PropTypes.func,
  morseCode: PropTypes.string
}
