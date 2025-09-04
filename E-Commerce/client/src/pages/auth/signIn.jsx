import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CommonForm from './../../components/common/form';
import { loginFormControl } from './../../config';

const initialState = {
  email: '',
  password: ''
}

export default function signIn() {
  const [formData, setFormData] = useState(initialState)

  const onSubmit = () => {
}
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>SignIn to your Account</h1>
        <p className='mt-2'>Don't have an accoun <Link to='/auth/signup' className='font-medium text-primary hover:underline ml-2'>SignUp</Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"SignIn"}
      />
    </div>
  )
}
