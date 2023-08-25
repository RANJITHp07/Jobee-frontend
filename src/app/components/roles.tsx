'use client'
import React from 'react'
import Image from 'next/image'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Roles() {
  return (
    <div className="bg-indigo-950 mx-32 p-5 rounded-xl hidden lg:block" data-aos="fade-down">
        <div className="flex ">
            <div className="mx-12 hidden lg:block">
            <Image  src={'/jobheader.png'} width={400} height={400} alt="photo"/>
            </div>
            <div className="">
                <div className="mt-5 flex">
                <div className='bg-white box_shadow rounded-lg p-3 m-5 cursor-pointer flex'>Full Stack Developer <KeyboardArrowRightIcon/></div>
                <div className='bg-white box_shadow rounded-lg p-3 m-5 cursor-pointer flex'>Marketing Manager <KeyboardArrowRightIcon/></div>
                <div className='bg-white box_shadow rounded-lg p-3  m-5 cursor-pointer flex'>Data Analyst<KeyboardArrowRightIcon/></div>
                </div>
                <div className='flex'>
                <div className='bg-white box_shadow rounded-lg p-3 m-5 cursor-pointer flex'>Product Manager<KeyboardArrowRightIcon/></div>
                <div className='bg-white box_shadow rounded-lg p-3 m-5 cursor-pointer flex'>UI/UX Designer<KeyboardArrowRightIcon/></div>
                <div className='bg-white box_shadow rounded-lg p-3 m-5 cursor-pointer flex'>Backend Developer<KeyboardArrowRightIcon/></div>
                </div>
                <div className=' flex'>
                <div className='bg-white box_shadow rounded-lg p-3 m-5 cursor-pointer flex'>Business Analyst <KeyboardArrowRightIcon/></div>
                <div className='bg-white box_shadow rounded-lg p-3 m-5 cursor-pointer flex'>Security Analyst <KeyboardArrowRightIcon/></div>
                <div className='bg-white box_shadow rounded-lg p-3 m-5 cursor-pointer flex'>Content Writer<KeyboardArrowRightIcon/></div>
                </div>
            </div>
            
            
        </div> 
    </div>
  )
}

export default Roles