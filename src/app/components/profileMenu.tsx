'use client*'
import React, { Dispatch, SetStateAction,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '@/redux/store';
import HouseIcon from '@mui/icons-material/House';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import ApartmentIcon from '@mui/icons-material/Apartment';

function ProfileMenu({ setopen }: { setopen: Dispatch<SetStateAction<boolean>> }) {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);

  return (
    <div className='bg-white h-screen md:w-96 w-56'>
      <div className='flex justify-end m-2 '>
        <CloseIcon onClick={()=>{setopen(false)}}/>
        </div>
        <div className='md:hidden'>
          <p className='font-bold mx-3 text-slate-600'>MENU</p>
          <hr className='border-1 border-indigo-950' />
          <div className=' flex items-center p-2 hover:bg-slate-100 '><p className='font-semibold mx-3 mt-6 text-slate-600'> <HouseIcon/>HOME</p></div>
          <div className=' flex items-center my-3 p-2 hover:bg-slate-100'><p className='font-semibold mx-3 text-slate-600'> <WorkIcon/>JOB</p></div>
          <div className=' flex items-center my-3 p-2 hover:bg-slate-100'><p className='font-semibold mx-3 text-slate-600'> <ApartmentIcon/>COMPANY</p></div>
          {
            userId &&
            <>
            <div className=' flex items-center my-3 p-2 hover:bg-slate-100'><p className='font-semibold mx-3 text-slate-600'> <AccountBoxIcon/>PROFILE</p></div>
            <div className=' flex items-center my-3 p-2 hover:bg-slate-100'><p className='font-semibold mx-3 text-slate-600'> <LogoutIcon />LOGOUT</p></div>
            </>
          }

        </div>
    </div>
  );
}

export default ProfileMenu;
