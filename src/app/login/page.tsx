'use client'
import React, { useEffect } from 'react';
import Form from '../components/form';
import LoadinPage from '../components/loadinPage';

function Login() {
   

  return (
    <div>
      <div className='w-full bg-indigo-950 p-3 md:p-5'>
        <p className='text-white font-extrabold text-2xl'>Jobee</p>
      </div>
      <Form page={false}/>
    </div>
  );
}

export default Login;
