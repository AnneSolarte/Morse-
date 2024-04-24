import './Home.css'
import name from '../../assets/name.png'
import PropTypes from 'prop-types'

export const Home = ({ setCurrentPage }) => {
  const changePage = () => {
    setCurrentPage('user-data')
  }

  return (
    <div className='home-div'>
      <img src={name} />
      <button onClick={changePage}>START</button>
    </div>
  )
}

Home.propTypes = {
  setCurrentPage: PropTypes.func
}
