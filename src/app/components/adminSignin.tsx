'use client'
import { message,Modal } from 'antd';
import React, { useRef,useState,ChangeEvent, useEffect } from 'react'
import {auth,signInnWithGooogle} from "../config/firebase"
import { useRouter } from 'next/navigation';
import { Adminlogin, AdminsendEmail, Adminsignin } from '@/api/auth';
import { CircularProgress } from '@mui/material';

function AdminSignin({page}:{page:boolean}) {
   const email=useRef<HTMLInputElement>(null);
   const password=useRef<HTMLInputElement>(null);
   const username=useRef<HTMLInputElement>(null);
   const confirm_password=useRef<HTMLInputElement>(null)
   const credentials=useRef<HTMLInputElement>(null)
   const router=useRouter()
   const [loading,setloading]=useState(false)
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [otp,setotp]=useState({
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',
    otp5:'',
    otp6:'',
  })


  
  //to allow admin to register using the google authentication
   const signInnWithgoogle=async ()=>{
       try{
        const google= await signInnWithGooogle()
        console.log(google)
        const data:any={
            ...google,   
            credentials:"qwerty",
            admin:true   
        }

            const res=await Adminsignin(data)
            if(res?.data==="Sucessfully signed In"){
              const res=await Adminlogin(data)
              
              if(res?.data.user.message==="Logged In succesfully"){
                localStorage.setItem("token",JSON.stringify(res.data))
              router.push("/admin")
                  
                  setloading(false) 
            }else{
              message.error(res?.data)
            }
       }
  }catch (err) {
    console.log(err);
  }
}

    // to signin using google authentication
    const signinwithLogin=async ()=>{
      try{
          const google:any= await signInnWithGooogle() // we get details from the firebase
             if(google){
              const res=await Adminlogin(google)
              const userId=res?.data.session.user
              if(res?.data.user.message==="Logged In succesfully"){
                localStorage.setItem("token",JSON.stringify(res.data))
              router.push("/admin")
                  
                  setloading(false) 
                 
              }
             }
             
         }catch (err) {
        console.log(err);
      }
    }
 
    
  //to handle when the user clicks the signin button and otp entering modal opens out
  const handleClick=async()=>{
     try{
        if(email.current?.value && username.current?.value && password.current?.value && confirm_password.current?.value && credentials.current?.value){
            
            if(password.current?.value.length < 0){
                  message.error("Minimum length should be 8");
                  return;
            }
            if(password.current.value===confirm_password.current.value){
               const admin={email:email?.current.value,username:username.current.value}
                const res=await AdminsendEmail(admin.email,admin.username)
          
          if(res.data=="Email sent"){
            message.success(res.data)
            setloading(true);
            setIsModalOpen(true);
          }
            }else{
                message.error("Password mismatch")
            }
        }else{
            message.error("Enter all the fields")
        }
     }catch(err){
        throw err
     }
  }

   const handleLogin=async()=>{
      
        try{
     
          setloading(true);
          const newUser={
            email:email.current?.value,
            password:password.current?.value
          }
          
          const res= await Adminlogin(newUser)
          console.log(res?.data)
          const userId=res?.data.session.user
          if(res?.data.user.message==="Logged In succesfully"){
            console.log(res?.data.user.role)
            localStorage.setItem("token",JSON.stringify(res.data))
              router.push("/admin")
          }
          else{
             message.error("enter correct email or password")
             setloading(false)
          }
      }
      catch (err) {
        console.log(err);
        message.error("Wrong Email Or Password")
        setloading(false);
   }
  }

  // to verify the otp and ensures that the user entered otp is crct or not
   const handleOk=async()=>{
    try{
       if(email.current?.value && username.current?.value && password.current?.value && confirm_password.current?.value && credentials.current?.value){
        if(password.current?.value.length <0){
              message.error("Minimum length should be 8");
              return;
        }
        if(password.current.value===confirm_password.current.value){
            const admin={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
                credentials:credentials.current.value,
                admin:true
               }
              const res=await Adminsignin(admin)
              message.success(res?.data)
              router.push("/admin/login")
        }else{
            message.error("Password not matching")
        }
           
       }else{
        message.error("Enter all the input fields")
       }
    }catch(err){

    }
   }
  return (
    <div className="box_shadow rounded-lg p-5 lg:w-1/4 md:w-1/2 w:full">
        <p className="text-center text-2xl font-bold">Admin Panel</p>
        {page && 
        <>
        <label htmlFor="password" className="block text-sm font-medium mt-2 text-gray-700">Username</label>
        <input
            id="password"
            type="text"
            placeholder="Enter your username"
            className="mt-1 block w-full p-3 md:p-2  lg:p-3  border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={username}
            required
          />
          </>
        }
          <label htmlFor="password" className="block text-sm font-medium mt-2 text-gray-700">Email</label>
        <input
            id="password"
            type="text"
            placeholder="Enter your email"
            className="mt-1 block w-full p-3 md:p-2  lg:p-3  border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={email}
            required
          />
          { page &&<>
         <label htmlFor="password" className="block text-sm font-medium mt-2 text-gray-700">Credentials</label>
        <input
            id="password"
            type="password"
            placeholder="Enter your credentials"
            className="mt-1 block w-full p-3 md:p-2  lg:p-3  border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={credentials}
            required
          /></>
              }
          <label htmlFor="password" className="block text-sm font-medium mt-2 text-gray-700">Password</label>
        <input
            id="password"
            type="password"
            placeholder="Enter your Password"
            className="mt-1 block w-full p-3 md:p-2  lg:p-3  border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={password}
            required
          />
         { page &&<>
         <label htmlFor="password" className="block text-sm font-medium mt-2 text-gray-700">Confirm Password</label>
        <input
            id="password"
            type="password"
            placeholder="Confirm Your password"
            className="mt-1 block w-full p-3 md:p-2  lg:p-3  border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={confirm_password}
            required
          /></>
              }
              
          <button type="button" className="login-with-google-btn my-3 w-full" onClick={()=>{page ? signInnWithgoogle():signinwithLogin()}}>
  Sign in with Google
</button>
          <button className="bg-indigo-950 text-white mt-3 w-full rounded-lg p-2" onClick={()=>{page?handleClick():handleLogin()}}>{page ?(loading ?<CircularProgress/>:"SignIn") :(loading ?<CircularProgress/>:"Login")}</button>
          <Modal title="Otp verification" open={isModalOpen} onOk={handleOk} onCancel={()=>setIsModalOpen(false)}>
         <div className="flex">
         <input
  className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
  maxLength={1}
  type='text'
  onChange={(e:ChangeEvent<HTMLInputElement>)=>{setotp({...otp,otp1:e.target.value})}}
/>
<input
  className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
  maxLength={1}
  type='text'
  onChange={(e:ChangeEvent<HTMLInputElement>)=>{setotp({...otp,otp2:e.target.value})}}
/>
<input
  className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
  maxLength={1}
  type='text'
  onChange={(e:ChangeEvent<HTMLInputElement>)=>{setotp({...otp,otp3:e.target.value})}}
/>
<input
  className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
  maxLength={1}
  type='text'
  onChange={(e:ChangeEvent<HTMLInputElement>)=>{setotp({...otp,otp4:e.target.value})}}
/>
<input
  className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
  maxLength={1}
  type='text'
  onChange={(e:ChangeEvent<HTMLInputElement>)=>{setotp({...otp,otp5:e.target.value})}}
/><input
  className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
  maxLength={1}
  type='text'
  onChange={(e:ChangeEvent<HTMLInputElement>)=>{setotp({...otp,otp6:e.target.value})}}
/>
           
         </div>
      </Modal>
      {!page ? <p className='text-center my-3'>Donot have a account<a href='/admin/signin' className='text-blue-400'> Create One</a></p> : <p className='text-center my-3'>Do you have a account<a href='/admin/signin' className='text-blue-400'> Login</a></p>  }
    </div>
  )
}


export default AdminSignin