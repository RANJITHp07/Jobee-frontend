'use client'
import React,{ChangeEvent,} from 'react'
import useOtpVerification from '../hooks/forgetpassword';

function Page() {
  const {
     email,
     updatePassword,
     password,
     confirm_password,
     
  } = useOtpVerification();
  return (
    <div>
      <div className='grid place-content-center box_shadow p-5 rounded-xl  h-96 md:mx-12 lg:w-1/2 lg:mx-auto mt-16 '>
          <p className='text-indigo-950 font-semibold text-center text-2xl'>ENTER THE PASSWORD</p>
          <input type='email' className='border-2 border-gray-400 p-2 rounded-xl my-3' placeholder='Enter the email' ref={email}/>
          <input type='password' className='border-2 border-gray-400 p-2 rounded-xl my-3' placeholder='Enter the Newpassword' ref={password}/>
          <input type='password' className='border-2 border-gray-400 p-2 rounded-xl' placeholder='Confirm the password' ref={confirm_password}/>
          <button className='bg-indigo-950 text-white font-semibold p-2 ml- rounded-xl my-5 w-full' onClick={()=>{updatePassword()}}>SUBMIT</button>
            </div>
     
      
    </div>
  )
}

export default Page