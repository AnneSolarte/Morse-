import './Message.css'
import PropTypes from 'prop-types'
import correctImg from '../../assets/correct-img.png'
import incorrectImg from '../../assets/incorrect-img.png'

export const Message = ({ type, text }) => {
  return (
    <div className='message-div' id={type + '-div'}>
      <img src={type === 'correct' ? correctImg : incorrectImg} alt='' />
    </div>
  )
}

Message.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
}
