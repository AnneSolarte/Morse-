import './Message.css'
import PropTypes from 'prop-types'

export const Message = ({ type, text }) => {
  return (
    <div className='message-div' id={type + '-div'}>
      <h2>{text} </h2>
      <img src='' alt='' />
    </div>
  )
}

Message.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
}
