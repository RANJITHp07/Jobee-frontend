'use client'
import CloseIcon from '@mui/icons-material/Close';
import RateReviewIcon from '@mui/icons-material/RateReview';
import InfoIcon from '@mui/icons-material/Info';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EditIcon from '@mui/icons-material/Edit';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch} from "react-redux"
import { AppDispatch } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logOut } from '@/redux/features/auth-slice';

interface adminProps {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  company:boolean
}

function CompanyPanel({setShowFilter,company}:adminProps) {
  
  const dispatch=useDispatch<AppDispatch>()
  const router=useRouter();
  return (
    <div className='bg-white h-screen w-1/2 lg:w-full overflow-auto lg:p-2 md:p-4'>
       <div className='flex justify-end m-2 lg:hidden'>
        <CloseIcon onClick={()=>{setShowFilter(false)}}/>
        </div>
        <div className='p-2'>
          <p className='text-indigo-950 font-semibold'>Comapny Details</p>
          
        </div>
        <hr className='border-1 border-indigo-950' />
        <div className='p-2  mt-7 cursor-pointer hover:bg-slate-200'>
          <p className='text-indigo-950 font-semibold flex items-center'><InfoIcon/><a href='#company' className='text-medium'>About</a></p>
        </div>
        {
          company && <>
           <div className='p-2  cursor-pointer hover:bg-slate-200'>
          <p className='text-indigo-950 font-semibold flex items-center'><MarkUnreadChatAltIcon/><a href='/chat' className='text-medium'>Chat</a></p>
        </div>
        <div className='p-2 cursor-pointer hover:bg-slate-200'>
          <p className='text-indigo-950 font-semibold flex items-center'><EditIcon/><a href='/company/form' className='text-medium'>Update</a></p>
        </div>
          </>
        }
  
        <div className='p-2 cursor-pointer hover:bg-slate-200'>
          <p className='text-indigo-950 font-semibold'><RateReviewIcon/><a href='#review' className='text-medium'>Reviews</a></p>
          
        </div>
        <div className='p-2 cursor-pointer hover:bg-slate-200'>
          <p className='text-indigo-950 font-semibold'><ApartmentIcon/><a href='#job' className='text-medium'>Jobs</a></p>
        </div>
        <div className='p-2 cursor-pointer hover:bg-slate-200 flex'>
          <p className='text-indigo-950 font-semibold flex' ><LogoutIcon/><p className='text-medium'  onClick={()=>{
          dispatch( logOut())
          localStorage.removeItem("token")
          router.push("/login")}}>Logout</p></p> 
        </div>
    </div>
  )
}

export default CompanyPanel