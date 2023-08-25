'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/store';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CloseIcon from '@mui/icons-material/Close';
import type { MenuProps } from 'antd';
import { Dropdown, message,Button } from 'antd';
import { useRouter } from 'next/navigation';
import { updateStatus } from '@/api/user';
import { createConvo } from '@/api/chat';

function UserDetails({user,setview,id}:{user:any, setview: React.Dispatch<React.SetStateAction<boolean>>,id:string}) {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const token=useAppSelector((state)=>state.authReducer.value.token)
  const router=useRouter()

  const handleChat=async()=>{
    try{
      
      const res=await createConvo(user._id.userId._id,userId,token) 
      router.push("/chat")
    }catch(err){
      throw err
    }
}
  const handleStatus=async(status:string)=>{
         try{
             const res=await updateStatus(id,user._id.userId._id,status,token)
             message.info("Updated")
         }catch(err){

         }
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p onClick={()=>handleStatus("Perfect")}>Perfect</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={()=>handleStatus("Good")}>Good</p>
      ),
    },
    {
      key: '3',
      label: (
        <p onClick={()=>handleStatus("Bad")}>Bad</p>
      ),
    },
  ];

  return (
    
      
    <div className="bg-white h-screen w-11/12 md:w-1/2 lg:w-1/3 p-3 overflow-scroll">
            <div className="flex justify-between mb-7">
            <Dropdown.Button menu={{ items }} placement="bottomRight">
                 Update the Status
      </Dropdown.Button>
       <Button onClick={()=>handleChat()}>Chat</Button>
             <CloseIcon className='cursor-pointer' onClick={()=>{setview(false)}}/>
            </div>
          <div className='flex mb-5 border-2 rounded-xl bg-cover p-2'>
             
            <div className=''>
              <p className='text-xs font-semibold'>Personal Information</p>
              <div className='flex items-center'>
              <p className='text-medium mt-3 '><span className='font-semibold'><AccountBoxIcon className='text-slate-700'/> Name: </span>{user._id.userId.username}</p>
              </div>
              <div className='flex items-center'>
              <p className='text-medium'><span className='font-semibold'><MailIcon className='text-slate-700'/> Email: </span>{user._id.userId.email}</p>
              </div>
              <div className='flex items-center'>
              <p className='text-medium'><span className='font-semibold'><LocalPhoneIcon className='text-slate-700'/> Contact: </span>{user._id.phoneNumber===0? "Not available": user._id.phoneNumber}</p>
              </div>
              {
                 !(user._id.resume==='') &&

                 <div className='my-3'>
              <a href={`http://localhost:5443/resume/${user._id.resume}`} target="_blank" rel="noopener noreferrer" className=" border-2 p-2 rounded-lg my-3 text-sm font-semibold border-slate-700">Resume</a>
              </div>
              }
              
              
            </div>
          </div>
          <div className='mb-5 border-2 rounded-xl bg-cover p-2'>
             <p className='text-sm'>Work Experience</p>
             <div className='bg-slate-100 p-2 my-2 rounded-lg'>
             <p className='text-sm'>{user._id.experince==''?"Not available":user._id.experience}</p>
             </div>
          </div>
          <div className='mb-5 border-2 rounded-xl bg-cover p-2'>
             <p className='text-sm'>Education</p>
             <div className='bg-slate-100 p-2 my-2 rounded-lg'>
             <p className='text-sm'>{user._id.education==''?"Not available":user._id.education}</p>
             </div>
          </div>

    </div>

  )
}

export default UserDetails