'use client'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from '@/redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import {useRouter} from 'next/navigation'


interface adminProps {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setpage: React.Dispatch<React.SetStateAction<{
    page1: boolean;
    page2: boolean;
}>>
page: {
  page1: boolean;
  page2: boolean;
}
}



function AdminPanel({setShowFilter,setpage,page}:adminProps) {
  
  const router=useRouter();
  const dispatch=useDispatch()

  return (
    <div className='bg-white  w-1/2 md:w-1/2 lg:w-full overflow-auto lg:pr-12'>
       <div className='flex justify-end m-2 lg:hidden'>
        <CloseIcon onClick={()=>{setShowFilter(false)}}/>
        </div>
        <div className='p-2'>
          <p className='text-indigo-950 font-semibold'>Admin Panel</p>
          <hr className='border-1 border-indigo-950' />
        </div>
        <div className='p-2  mt-7 cursor-pointer hover:bg-slate-200'>
          <p className='text-indigo-950 font-semibold'><PeopleOutlineIcon/><span className='text-medium' onClick={()=>setpage({...page,page1:true,page2:false})}> All Users</span></p>
        
        </div>
        <div className='p-2 cursor-pointer hover:bg-slate-200'>
          <p className='text-indigo-950 font-semibold'><ApartmentIcon/><span className='text-medium' onClick={()=>setpage({...page,page1:false,page2:true})}> All Companies</span></p>
        </div>

        <div className='p-2 cursor-pointer hover:bg-slate-200 '>
        <p className='text-indigo-950 font-semibold flex' ><LogoutIcon/><p className='text-medium'  onClick={()=>{
          dispatch( logOut())
          localStorage.removeItem("token")
          router.push("/admin/login")}}> Logout</p></p> 
          
        </div>
    </div>
  )
}

export default AdminPanel