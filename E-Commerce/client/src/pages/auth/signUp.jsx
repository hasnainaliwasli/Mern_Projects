import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CommonForm from './../../components/common/form';
import { registerFormControl } from './../../config';

const initialState = {
  userName: '',
  email: '',
  password: ''
}

const onSubmit = () => {

}

export default function signUp() {
  const [formData, setFormData] = useState(initialState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p className='mt-2'>Already have an account  <Link to='/auth/signin' className='font-medium text-primary hover:underline ml-2'>Login</Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"SignUp"}
      />
    </div>
  )
}
