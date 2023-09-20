'use client'
import { getShortlist } from '@/api/user'
import { useAppSelector } from '@/redux/store'
import React, { useEffect } from 'react'

function Jobdescription({job,setusers}:{job:any,setusers: React.Dispatch<React.SetStateAction<never[]>>
}) {

      const token=useAppSelector((state)=>state.authReducer.value.token)
        const handleClick=async()=>{
          try{
            const res=await getShortlist(job._id,token)
            setusers(res.data)
          }catch(err){
            throw err
          }
        }
    
  return (
    <div className="box_shadow rounded-xl p-5">
        <div className="flex justify-between items-center">
            <p className="text-slate-500 font-bold">Job Description</p>
            <button className='text-xs border-2 p-2 border-indigo-950 rounded-lg text-black font-semibold' onClick={()=>{handleClick()}}>Shortlisted Users</button>
        </div>
        <p className="mt-3"><span className="font-bold text-slate-600 pl-3">Role: </span>{job.role}</p>
        <p className="m"><span className="font-bold text-slate-600 pl-3">Location: </span>{job.location}</p>
        <p className=""><span className="font-bold text-slate-600 pl-3">Salary: </span><span className="text-sm">{job.salary[0]}-{job.salary[1]}Lakhs</span></p>
        <p className=""><span className="font-bold text-slate-600 pl-3">Experience: </span><span className="text-sm">{job.experience[0]}-{job.experience[1]}Years</span></p>

        <div className="bg-slate-100 my-3 rounded-xl p-3 ">
        <p  className="font-bold text-slate-600">Job Description</p>
            <p>{job.desc}</p>
        </div>
        <p className="m"><span className="font-bold text-slate-600 px-3">Skills</span></p>
        
            {job.skills.map((p:string)=>{
                return (
                    <div className="my-3 bg-slate-300 bg-opacity-30 border mx-1 border-slate-200 text-slate-600 rounded-xl mt-3 px-2 inline-block backdrop-filter backdrop-blur-lg">
                    {p}
                  </div>
                )
            })}
    </div>
  )
}

export default Jobdescription