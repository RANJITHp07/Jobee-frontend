'use client'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { Steps } from 'antd';
import { getPhoto } from '@/apis/company';

function Jobstatus({job,status}:{job:any,status:any[]}) {
  const[number,setnumber]=useState(0)
  const[url,seturl]=useState('')

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

  useEffect(()=>{
    const fetchData=async()=>{
      const response=await getPhoto(job.company.logo)
    console.log(response.data)
    seturl(response.data)
    }
    fetchData()
    
  },[])

  return (
    <div className='mx-5 md:mx-20 box_shadow  p-5 rounded-lg'>
    <div className=' flex justify-between' onClick={()=>{}}>
                       <div>
                        <p className='text-xs md:text-lg font-bold'>Role:{job.role}</p>
                        <p className='text-xs md:text-lg font-bold'>Location:{job.location}</p>
                        
                        <p className='text-xs md:text-lg  font-bold'>Salary:{ job.salary[0]==0 ? "Not disclosed" : ( job.salary[0] - job.salary[1] + "lakhs" )} </p>
                       
                       </div>
                       <div>
                        <Image src={url} width={100} height={100} alt='photo'/>
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