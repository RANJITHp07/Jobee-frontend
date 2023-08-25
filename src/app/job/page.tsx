'use client'
import {  useSearchParams } from 'next/navigation'
import React, { useState,useMemo } from 'react';
import Navbar from '../components/navbar';
import dynamic from "next/dynamic";
import Joblisting from '../components/joblisting';
import { Pagination, message } from 'antd';
import { Jobroleserach, filter,searchJob } from '@/api/job';
import LoadinPage from '../components/loadinPage';


const Filter = dynamic(() => import('../components/filter'), {
  loading: () => <LoadinPage />,
});

function Page() {
  
  const [showFilter, setShowFilter] = useState(false);
  const [loading,setloading]=useState(true)
  const [job,setjob]=useState([])
  const searchParams = useSearchParams()
  const[pagination,setpagination]=useState(1)
  const param=searchParams.get("category")
  const param1=searchParams.get("search")
  const param3=searchParams.get("role");
  const param4=searchParams.get("location")


 useMemo(() => {
    const fetchData = async () => {
      try {
        let jobData = [];

        if (param) {
          let mode = ["Remote", "Hybrid", "On-Site"].includes(param) ? true : false;
          let res;
          if(mode){
            res = await filter([param], [], [], [0, 100], [], []);
          }else{
            res = await filter([], [], [param], [0, 100], [], []);
          }
          
         
          jobData = res.data;
        } else if (param1) {
          const res = await searchJob(param1);
          jobData = res.data;
        }else if(param3 && param4){
          const res=await Jobroleserach(param3,param4)
          console.log(res.data)
          jobData = res.data;
        }
         else {
        const res = await filter([], [], [], [0, 100], [], []);
          
          jobData = res.data;
        }
        setjob(jobData);
        setloading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [param, param1]);


  const JobList = useMemo(() => {
    if (job.length > 0) {
      return job
        .slice(pagination * 4 - 4, pagination * 4)
        .map((j: any) => <Joblisting key={j._id} page={true} {...j} />);
    } else {
      return (
        <p className='md:text-8xl text-6xl text-center my-32 text-slate-300 font-medium mx-12'>
          No jobs available
        </p>
      );
    }
  }, [job, pagination]);


  return (
    <div>
      { loading ? <LoadinPage/> : <>
      <div className="bg-indigo-950">
        <Navbar page={true} />
      </div>
      <div className="flex">
        {showFilter && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50"
          >
            <Filter setShowFilter={setShowFilter} setjob={setjob} param={param} param1={param1} param3={param3} param4={param4}  />
          </div>
        )}
        <div className=' hidden lg:block w-72 lg:w-72 border-2'>
        <Filter setShowFilter={setShowFilter} setjob={setjob} param={param} param1={param1} param3={param3} param4={param4}   />
        </div>
        <div>
          <button
            className="z-0 relative bg-indigo-950 text-white font-bold px-2 py-1 m-2 rounded-xl lg:hidden"
            onClick={() => setShowFilter(true)}
          >
            Filter
          </button>
          <div className='mt-7 '>
            {
               JobList
            }

          </div>
          <Pagination defaultCurrent={1} total={(Math.ceil(job.length / 4) * 10)}  onChange={(e:number) => {
              setpagination(e);
            }} className='text-center mt-32 mb-5' />
        </div>
      </div>
      </>}
    </div>
  );
}

export default Page;
