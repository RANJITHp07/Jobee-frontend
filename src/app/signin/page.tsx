'use client'
import React,{useEffect, useState} from 'react'
import Form from '../components/form'
import { useRouter } from 'next/navigation'
import { message } from 'antd'
import LoadinPage from '../components/loadinPage'


function Signin() {
  
  const router=useRouter()
  const [loading,setloading]=useState(true)

  useEffect(()=>{
    // checking whether the user is logged in or not
     const storedToken = localStorage.getItem('token');
     if(storedToken!==null){
       const parsedToken: any = JSON.parse(storedToken);
       if(parsedToken.user.role==='recruiter'){
         router.push("/company");
         message.info("Already logged In")
       }else{
         router.push("/");
         message.info("Already logged In")
       }
          
     }else{
       setloading(false)
     }
   },[])



  return (
    <div>
       {
        loading ? <LoadinPage/> :
        <>
        <div className='w-full bg-indigo-950 p-3 md:p-5'>
       <p className='text-white font-extrabold text-2xl'>Jobee</p>
    </div>
    <Form page={true}/> 
        </>
       }
       
    </div>
  )
}

export default Signin