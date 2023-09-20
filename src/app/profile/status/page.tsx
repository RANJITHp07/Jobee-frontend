'use client'

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import {useDispatch} from "react-redux"
import { logOut } from '@/redux/features/auth-slice';
import Navbar from "../../components/navbar"
import React,{useState,useEffect}from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import EditIcon from '@mui/icons-material/Edit';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Jobstatus from '@/app/components/jobstatus'
import { useAppSelector } from '@/redux/store';
import LoadinPage from '@/app/components/loadinPage'
import { loadingItems } from '@/redux/features/loading-slice'
import CloseIcon from '@mui/icons-material/Close';
import { statusJob } from '@/apis/user'


function page() {

  const loading:Boolean=useAppSelector((state)=>state.loadingReducer.value.loading)
  const token=useAppSelector((state)=>state.authReducer.value.token)
    const [job,setjob]=useState<any>([])
    const [menu,setmenu]=useState(false)
    const [status,setstatus]=useState<any>([])
    const params=useSearchParams().get("id")
    const dispatch =useDispatch()
    const router=useRouter()

    useEffect(()=>{
        const fetchData=async()=>{
            try{
              if(params && token){
               
                const res=await statusJob(params,token)
                setstatus(res.data.detail)
                setjob(res.data.jobs)
                dispatch(loadingItems())
              }
            }catch(err){
                throw err
            }
        }
        fetchData()
    },[params,token])

  return (
    <div>
      <div className="bg-indigo-950">
         <Navbar page={false}/>
      </div>
      {
         loading ? <LoadinPage/> :
         <div className='lg:flex'>
      <div className="hidden lg:block md:w-56 lg:w-72 border-2 pt-6 h-screen">
        <p className='font-bold mx-3 text-slate-600'>MENU</p>
          <hr className='border-1 border-indigo-950' />
        <div className=' flex items-center p-2 hover:bg-slate-100 '><a href='/profile/update' className='font-semibold mx-3 mt-6 text-slate-600'><EditIcon/>Update</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><a href="/chat" className='font-semibold mx-3 text-slate-600'><MarkUnreadChatAltIcon/>Chat</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><a href='#' className='font-semibold mx-3 text-slate-600'><PendingActionsIcon/>Application Status</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><p className='font-semibold mx-3 text-slate-600' onClick={()=>{
          dispatch( logOut())
          localStorage.removeItem("token")
          router.push("/login")}}><ExitToAppIcon/>Logout</p></div>
          </div>
          {
            menu && <div className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50">
                 <div className="bg-white md:w-1/2 border-2  h-screen">
                 <div className='flex justify-end m-2'> <CloseIcon onClick={()=>setmenu(false)}/></div>
        <p className='font-bold mx-3 text-slate-600'>MENU</p>
          <hr className='border-1 border-indigo-950' />
        <div className=' flex items-center p-2 hover:bg-slate-100 '><a href='/profile/update' className='font-semibold mx-3 mt-6 text-slate-600'><EditIcon/>Update</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><a href="/chat" className='font-semibold mx-3 text-slate-600'><MarkUnreadChatAltIcon/>Chat</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><a href='#' className='font-semibold mx-3 text-slate-600'><PendingActionsIcon/>Application Status</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><p className='font-semibold mx-3 text-slate-600' onClick={()=>{
          dispatch( logOut())
          localStorage.removeItem("token")
          router.push("/login")}}><ExitToAppIcon/>Logout</p></div>
          </div>
          
            </div>
          }
          
          <div className='flex justify-end my-2 mx-2 lg:hidden'>
          <button className='bg-indigo-950 text-white rounded-lg p-2' onClick={()=>setmenu(true)}>Menu</button>
          </div>
          
          <div className='w-full lg:w-3/4'>
            <p className="p-5 font-bold">Check All your Application</p>
            
            {
                job.length>0 ? job.map((job:any)=>{
                  return (<>
                  <div className='mb-12'>
                  <Jobstatus job={job} status={status}/>
                  </div>
                    </>
                    
                )
                }):<p className='md:text-8xl text-6xl text-center my-32 text-slate-300 font-medium'>No jobs applied</p>
            }
          </div>
      </div>
      }
      
    </div>
  )
}

export default page