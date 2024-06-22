import React from 'react'
import { useState } from 'react';

const initialFormData = {
  email: '',
  password: '',
};

const initialFormError = {  
  email: '',
  password: '',
};

export default function login() {

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.email]: e.target.value }));
  }
  return (
    <div className='form-container'>
      <form className='inner-container'>
        <h2 className='form-title'>Login Form</h2>

        <div className='form-group'>
          <label>Email</label>
          <input
          className='form-control'
            type='email'
            name='email'
            placeholder='sadeepfernando@gmail.com'
            value={formData.email}
            onChange={handleChange}
            />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
          className='form-control'
            type='password'
            name='password'
            placeholder='*********'
            value={formData.password}
            onChange={handleChange}
            />
        </div>

        <div className='form-group'>
          <input type='submit' value='Login' className='button' />
        </div>

      </form>
      
    </div>
  )
}
