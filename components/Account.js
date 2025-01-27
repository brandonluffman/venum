import React, { useState } from 'react'
import Login from './Login'
import AccountPage from './AccountPage'

const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <div className='main-account-container'>
        {isLoggedIn ? (
            <AccountPage />
        ):(
            <Login />
        )}
    </div>
  )
}

export default Account