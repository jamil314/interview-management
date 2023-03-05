import LoginForm from '@/component/Forms/LoginForm'
import Header from '@/component/margins/Header'
import React from 'react'

const login : React.FC = () => {
  return (
    <>
        <Header/>
        <div>login</div>
        <LoginForm/>
    </>
  )
}

export default login