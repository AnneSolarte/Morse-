import './Timer.css'
import PropTypes from 'prop-types'

export const Timer = ({ timeLeft }) => {
  return (
    <div className='timer-div'>
      {
        timeLeft === 0
          ? null
          : (
            <p>{timeLeft}</p>
            )
        }
    </div>
  )
}

Timer.propTypes = {
  timeLeft: PropTypes.number
}

export default Timer
