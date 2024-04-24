import './NextLevelMessage.css'
import PropTypes from 'prop-types'

export const NextLevelMessage = ({ level }) => {
  return (

    <div className='next-level-div'>
      <h2>CONGRATULATIONS Next Level {level} </h2>
      <img src='' alt='' />
    </div>
  )
}

NextLevelMessage.propTypes = {
  level: PropTypes.number
}
