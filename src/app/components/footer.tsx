'use client'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer() {
  return (
    <div className='bg-indigo-950 grid place-content-center'>
        <p className='text-white text-center pt-16'>Job portal designed By Ranjith</p>
        <div className='flex justify-center items-center mt-3 pb-16'>
        <InstagramIcon className='text-white mx-3 '/>
        <FacebookIcon className='text-white'/>
        </div>
    </div>
  )
}

export default Footer