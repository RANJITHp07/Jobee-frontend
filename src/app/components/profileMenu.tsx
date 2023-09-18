'use client*'
import React, { Dispatch, SetStateAction,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '@/redux/store';
import HouseIcon from '@mui/icons-material/House';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logOut } from '@/redux/features/auth-slice';

function ProfileMenu({ setopen }: { setopen: Dispatch<SetStateAction<boolean>> }) {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const router=useRouter()
  const dispatch=useDispatch()

  return (
    <div className='bg-white h-screen md:w-96 w-56'>
      <div className='flex justify-end m-2 '>
        <CloseIcon onClick={()=>{setopen(false)}}/>
        </div>
        <div className='md:hidden p-2'>
          <p className='font-bold mx-3 text-slate-600'>MENU</p>
          <hr className='border-1 border-indigo-950 mb-6' />
          <div className=' flex items-center p-2 hover:bg-slate-100 hover:p-4 hover:rounded-md ' onClick={()=>router.push("/")}><p className='font-semibold mx-3  text-slate-600'> <HouseIcon/>HOME</p></div>
          <div className=' flex items-center my-3 p-2 hover:bg-slate-100 hover:p-4 hover:rounded-md' onClick={()=>router.push("/job")}><p className='font-semibold mx-3 text-slate-600'> <WorkIcon/>JOB</p></div>
          <div className=' flex items-center my-3 p-2 hover:bg-slate-100 hover:p-4 hover:rounded-md' onClick={()=>router.push("/companies")}><p className='font-semibold mx-3 text-slate-600'> <ApartmentIcon/>COMPANY</p></div>
          {
            userId &&
            <>
            <div className=' flex items-center my-3 p-2 hover:bg-slate-100 hover:p-4 hover:rounded-md'><p className='font-semibold mx-3 text-slate-600' onClick={()=>router.push(`/profile/${userId}`)}> <AccountBoxIcon/>PROFILE</p></div>
            <div className=' flex items-center my-3 p-2 hover:bg-slate-100 hover:p-4 hover:rounded-md'><p className='font-semibold mx-3 text-slate-600' 
            onClick={()=>{
              dispatch( logOut())
              localStorage.removeItem("token")
              router.push("/login")}}> <LogoutIcon />LOGOUT</p></div>
            </>
          }

        </div>
    </div>
  );
}

export default ProfileMenu;
