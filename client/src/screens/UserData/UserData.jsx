import { useState } from 'react'
import './UserData.css'

export const UserData = () => {
  const [user, setUser] = useState({})

  const onSubmmit = e => {
    e.preventDefault()

    const data = e.target

    const dataUser = {
      name: data.name.value,
      email: data.email.value
    }

    console.log(dataUser)
    setUser(dataUser)
  }

  const onChangeText = e => {
    const inputName = e.target.name

    setUser(prevState => ({ ...prevState, [inputName]: e.target.value }))
  }

  return (
    <div className='user-data-div'>
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
