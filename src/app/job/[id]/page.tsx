'use client'
import React,{useEffect, useState,useMemo} from 'react'
import Navbar from '@/app/components/navbar'
import { getUser } from '@/api/job'
import Joblisting from '@/app/components/joblisting'
import SimilarJobs from '@/app/components/similarJobs'
import Footer from '@/app/components/footer'
import LoadinPage from '@/app/components/loadinPage'



function Page({ params }: { params: { id: string } }) {
const [job,setJob]=useState<any>()
const [loading,setloading]=useState(true)


  useEffect(()=>{
       const fetchData=async()=>{
        const res=await getUser(params.id)
      
        setJob(res?.data)
        setloading(false)
       }
       fetchData()
  },[])

  const skillsList = useMemo(() => {
    if (job) {
      return job.skills.map((s: string) => (
        <div
          key={s}
          className="my-3 bg-slate-300 bg-opacity-30 border mx-1 border-slate-200 text-slate-600 rounded-xl mt-3 px-2 inline-block backdrop-filter backdrop-blur-lg"
        >
          {s}
        </div>
      ));
    }
    return null; 
  }, [job]);

  return (
    <div>
      { loading ? <LoadinPage/> : <>
      <div className='bg-indigo-950'>
      <Navbar page={true}/>
      </div >
      <div className='lg:flex'>
      <div className='lg:w-3/4 mx-8'>
        <div>
      {
        job &&  <Joblisting key={job._id} page={false} {...job} />
      }
      </div>
      
      <div className=' box_shadow rounded-xl p-5'>
      <p ><span className='text-slate-600 font-bold'>Role :</span> {job?.role}</p>
      <p><span className='text-slate-600 font-bold'>ComapnyType:</span> {job?.company.companyType}</p>
       <p className='text-slate-600 font-bold mt-2'>Job desciption</p>
       <div className='bg-slate-100 p-2 rounded-lg mb-2'>{job?.desc}</div>
       <p className='text-slate-600 font-bold mt-2'>Education</p>
       <div className='bg-slate-100 p-2 rounded-lg mb-2'>{job?.education}</div>
       <p className='text-slate-600 font-bold'>Skills</p>
       
        {skillsList}
   
      </div>
      </div>
      <div className='lg:w-1/2 p-5'>
       {job && <SimilarJobs role={job.role} location={job.location} id={job._id} skills={job.skills}/>}
      </div>
      </div>
      <div className='bg-indigo-950 mt-16 lg:block hidden'>
      <Footer/>
      </div>
      </> }
    </div>
  )
}

export default Page