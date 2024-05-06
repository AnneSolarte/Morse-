import './UserData.css'
import PropTypes from 'prop-types'
import img from '../../assets/title.png'
import img2 from '../../assets/morsa.png'

export const UserData = ({ user, setUser, setCurrentPage }) => {
  const onSubmmit = e => {
    e.preventDefault()

    const data = e.target

    const dataUser = {
      name: data.name.value,
      email: data.email.value
    }

    console.log(dataUser)
    setUser(dataUser)
    setCurrentPage('main')
  }

  const onChangeText = e => {
    const inputName = e.target.name

    setUser(prevState => ({ ...prevState, [inputName]: e.target.value }))
  }

  return (
    <div className='user-data-div'>
      <img src={img} className='img' />
      <img src={img2} className='img2' />
      <div className='form-card'>
        <form onSubmit={onSubmmit} className='form'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={user.name}
            className='task-input'
            onChange={onChangeText}
          />

          <input
            type='text'
            placeholder='Email'
            name='email'
            value={user.email}
            className='task-input'
            onChange={onChangeText}
          />

          <input
            className='button submit-input'
            type='submit'
            value='START'
          />
        </form>

      </div>

    </div>
  )
}

UserData.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setCurrentPage: PropTypes.func
}
