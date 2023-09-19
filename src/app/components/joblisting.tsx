import React,{useState,useMemo,useCallback,useEffect} from 'react'
import Image from 'next/image'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { savejobs, savedJobs } from '@/api/save';
import { message } from 'antd';
import {useDispatch} from "react-redux"
import { AppDispatch } from '@/redux/store';
import StarIcon from '@mui/icons-material/Star';
import {format} from "timeago.js"
import { saveJobs } from '@/redux/features/save-slice';
import { jobApply, userExist } from '@/api/job';
import { getPhoto } from '@/api/company';

interface Props{
    _id?:string
    page:boolean,
    company:any,
    role: string;
    desc: string;
    experience: number[];
    skills: string[];
    companyType: 'Startup' | 'MNC' | 'Service-based' | 'Product-based' | 'Non-profit' | 'E-commerce' | 'Financial Institution' | 'Technology Company' | 'Consulting Firm' | 'Manufacturing Company';
    salary: number[];
    location:string;
    createdAt:any

}

function Joblisting({page,...p}: Props & { key: React.Key }) {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const token=useAppSelector((state) => state.authReducer.value.token)
  const saved=useAppSelector((state) => state.saveReducer.value.saved)
  const [applied,setapplied]=useState(false)
  const [url,seturl]=useState('')
  const router=useRouter()
  const [save,setsave]=useState<boolean>(false)
  const dispatch=useDispatch<AppDispatch>()
  
  // to handle the user who apply  for the job

  const handleApply = useCallback(async (id: string) => {
    try {
      const res = await jobApply(id, userId, token);
      setapplied(true);
      message.info('Applied to the job post');
    } catch (err) {
      console.log(err);
    }
  }, [userId, token]);


   //to save the job in the save posts
  const handleSave = useCallback(async (jobId: string) => {
    try {
      setsave(!save);
      const res = await savejobs({ id: userId, jobId }, token);
      const response = await savedJobs(userId, token);
      dispatch(saveJobs(response.data.saved));
      message.success(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [userId, token, dispatch]);


//checking if the user has saved the post or not
useMemo(()=>{
   const fetchData=async()=>{
       if(userId && p._id && !page){
         const res=await userExist(p._id,userId,token) 
         setapplied(res.data)
       }
       
      
   }
   fetchData()
},[userId])

useEffect(()=>{
  const fetchData=async()=>{
    const response=await getPhoto(p.company.logo)
  console.log(response.data)
  seturl(response.data)
  }
  fetchData()
  
},[])

  return (
    <div {...p} className={page ?'box_shadow p-3 mx-10 my-8 rounded-xl md:w-10/12  job md:ml-16 w-3/4':'box_shadow p-3 my-3 rounded-xl  w-full '} >
      <div  className='cursor-pointer'>
      <div className='flex'>
        <div onClick={()=>{router.push(`/job/${p._id}`)}}>
          <p className='font-bold'>{p.role}</p> 
          <div className='flex items-center'>
          <p className='font-medium mr-4'>{p.company.companyusername}</p>
          </div>
          <p className='text-xs'>{p.company.companyType}</p>
          <p className='text-xs mb-5'>{p.company.rating}<StarIcon className='text-xs text-yellow-500'/></p>
        </div>
        <div className='ml-auto md:ml-auto lg:hidden '>
          <Image src={url} width={100} height={100} alt="photo" className='rounded-xl' onClick={()=>{router.push(`/company/${p.company._id}`)}} />
        </div>
        <div className='ml-6 md:ml-auto hidden lg:block'>
        <Image src={url} width={100} height={100} alt="photo" className='rounded-xl' onClick={()=>{router.push(`/company/${p.company._id}`)}}/>
        </div>
       </div>
       <div className={`${!page ? "grid" :"first-letter"}  mb-3  lg:mr-54`}>
        <p className=' text-sm  text-slate-500 my-1  md:inline  md:mr-4'><WorkOutlineIcon className='text-sm'/> {p.experience[0]}-{p.experience[1]} Yrs </p>
        <p className=' text-sm  text-slate-500 my-1 md:inline md:mr-4'><CurrencyRupeeIcon className='text-sm'/> {p.salary[0]===0 && p.salary[1]===0 ?"Not disclosed" : <> {p.salary[0]}-{p.salary[1]} lakhs  </>}</p>
        <p className=' text-sm text-slate-500 my-1 md:inline md:mr-4'><LocationOnIcon className='text-sm' />{p.location}</p>
       </div>
      </div>
       
       {page && <div className='flex text-sm  text-slate-500 my-5'><DescriptionIcon className='text-sm'/>{p.desc.slice(0,100)}....</div>}
       {
        page ? <div className=' flex justify-between ml:auto mt-3 mx-2 cursor-pointer' onClick={()=>{
          if(userId){
            handleSave(p._id ? p._id:"")
          }else{
            message.info("Please Login")
          }
          
          }}>
             <p className='text-xs text-slate-500'>{format(p.createdAt)}</p>
             <div  className='flex'>
             {save ? <BookmarkIcon/> : <TurnedInNotIcon/>}
        
        <p>Save</p>
             </div>
     </div> :
     <div className='flex justify-end'>  
      <button className='bg-indigo-950 text-white px-4 py-1 font-bold rounded-full mx-1' onClick={()=>{if(!applied){ userId ?handleApply(p._id ? p._id:"") : message.info("Please Login")}}}>{applied ? "Applied" : "Apply" }</button>
      <button className='border-indigo-950 border-2 px-4 py-1 font-bold rounded-full mx-1'onClick={()=>{
        
         userId ? handleSave(p._id ? p._id:"") : message.info("Please Login")
          }}>{save? "Saved":"Save"}</button>
     </div>

       }
       
    </div>
  )
}

export default Joblisting