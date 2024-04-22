import './Score.css'
import PropTypes from 'prop-types'

export const Score = ({ userScore }) => {
  return (
    <div>Score : {userScore} </div>
  )
}

Score.propTypes = {
  userScore: PropTypes.number
}
