'use client'
import JobForm from '@/app/components/jobForm'
import Navbar from '@/app/components/navbar'
import MenuIcon from '@mui/icons-material/Menu';
import CompanyPanel from '@/app/components/companyPanel';
import React,{useState} from 'react'

function Page() {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div>
        <div className='bg-indigo-950 hidden'>
        <Navbar page={true}/>
        </div>
        
        <div className="bg-indigo-950 p-5 w-screen flex justify-between">
        <p className='text-white font-extrabold text-2xl'>Jobee</p>
        <MenuIcon className="block lg:hidden text-white" onClick={()=>{
          setShowFilter(true);
          }}/>
        </div>
        {  showFilter &&
             <div className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50">
             <CompanyPanel setShowFilter={setShowFilter} company={true}/>
            </div>
        }
       
        <div className='mx-3 mt-5 box_shadow rounded-lg py-3 px-3 lg:w-1/2 lg:mx-auto lg:mt:12'>
        <p className='text-xl font-bold text-center mb-7'>Job Application Form</p>
        <JobForm/>
        </div>
    </div>
   
  )
}

export default Page