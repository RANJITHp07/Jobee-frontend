'use client'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { Steps } from 'antd';

function Jobstatus({job,status}:{job:any,status:any[]}) {
  const[number,setnumber]=useState(0)
  useEffect(()=>{
    const user= status.find((id)=>job._id===id._id)
    if(user){
      if(user.shortlisted){
        setnumber(2)
      }else if(user.viewed){
          setnumber(1)
      } 
    }
  },[])
  return (
    <div className='mx-5 md:mx-20 box_shadow  p-5 rounded-lg'>
    <div className=' flex justify-between' onClick={()=>{}}>
                       <div>
                        <p className='text-xs md:text-lg font-bold'>Role:{job.role}</p>
                        <p className='text-xs md:text-lg font-bold'>Location:{job.location}</p>
                        
                        <p className='text-xs md:text-lg  font-bold'>Salary:{job.salary[0]}-{job.salary[1]} Lakhs</p>
                       
                       </div>
                       <div>
                        <Image src={`http://localhost:5443/logo/${job.company.logo}`} width={100} height={100} alt='photo'/>
                        </div>
                        
                    </div>
                    <Steps
                    className='mt-12'
    current={number}
    items={[
      {
        title: 'Applied',
        description:"Applied for the job post",
      },
      {
        title: 'Viewed',
        description:"Is the profile viewed or not",
        
      },
      {
        title: 'Shortlisted',
        description:"Is your profile shortlisted or not",
      },
    ]}
  />
                    </div>
  )
}

export default Jobstatus