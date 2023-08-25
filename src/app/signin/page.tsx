import React from 'react'
import Form from '../components/form'

function Signin() {
  return (
    <div>
       <div className='w-full bg-indigo-950 p-3 md:p-5'>
       <p className='text-white font-extrabold text-2xl'>Jobee</p>
    </div>
    <Form page={true}/> 
    </div>
  )
}

export default Signin