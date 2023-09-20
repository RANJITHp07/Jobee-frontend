'use client'
import Navbar from '@/app/components/navbar'
import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Jobdescription from '@/app/components/jobdescription'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import UserDetails from '@/app/components/userDetails'
import LoadinPage from '@/app/components/loadinPage'
import { getUser } from '@/apis/job'
import { getShortlist, getView, getapplicant, shortlistusers, statusShortlist, unshortlistusers } from '@/apis/user'
import { useAppSelector } from '@/redux/store'
import { getPhoto } from '@/apis/company'

function Page({params}:{params:{id:string}}) {
  const token=useAppSelector((state)=>state.authReducer.value.token)
  const [loading,setloading]=useState(true)
  const [users,setusers]=useState([])
  const [selectedusers,setselectedusers]=useState<string[]>([])
  const[status,setstatus]=useState<string[]>([])
  const [selectedUserId, setSelectedUserId] = useState('');
  const [checkbox,setcheckbox]=useState(false)
  const [view,setview]=useState(false)
  const [state,setstate]=useState(false)
  const [job,setjob]=useState()
  const [url,setImageUrl]=useState<any>([])
  const router=useRouter()

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        if(token){
          const res=await getShortlist(params.id,token)
          if(res.data){
            const u=res.data.map((r:any)=>r._id._id)
          }
        }
             
      
      }catch(err){
        throw err
      }
    }
    fetchData()
  },[])


  useEffect(() => {
    const fetchData=async()=>{
      if(status.length>0){
        console.log(status)
        const res=await statusShortlist(params.id,status,token)
        console.log(res.data)

        res.data[0] ? setusers(res.data) :setusers([])
      }else{
      
        if(token){
          const res=await getapplicant(params.id,token)
       
          res?.data ? setusers(res.data.applications) :setusers([])
          const p=res?.data.applications.map((m:any)=>{
             if(m.shortlisted){
              return m._id._id
             }
          })
          const idArray = p.filter((id:string | undefined) => id !== undefined);
          setselectedusers(idArray)
        }
      }
    }
    fetchData()
    
  }, [status,token]);

  

  useEffect(()=>{
    const fetchData=async()=>{
        try{
           const res=await getUser(params.id)
          
           res?.data && setjob(res.data)
           setloading(false)
        }catch(err){
          throw err 
        }
    }
    fetchData()

  },[])

  const handleStatus = (s:string) => {
    if (status && status.includes(s)) {
      setstatus((prev) => {
        return prev.filter((p) => p !== s);
      });
    } else {
      setstatus((prev) => [...prev, s]);
    }
    
  };
  

  const handleSelected=async()=>{
    try{
      if(checkbox){
        console.log(selectedusers)
        const res=await shortlistusers(params.id,selectedusers,token)
        console.log(res.data)
        setcheckbox(false)
      }
    }catch(err){
      throw err
    }
  }

  //to handle the change
  const handleChange=(id:string)=>{
  
    setselectedusers((prev:any)=>{
      if(selectedusers.includes(id)){
         return prev.filter((p:any)=>p!==id)
      }else{
        return [...prev, id];
      }
    })
  }
  const handleView=async(userId:string)=>{
     try{
      setview(true)
       setSelectedUserId(userId)
      getView(params.id,userId,token)
    
     }catch(err){
      throw err
     }
  }

//to fetch the url
  useEffect(() => {
    const fetchMessageUrls = async () => {
        const imageUrlPromises = users.map(async (p:any) => {
          
          if(p._id.photo!==''){
           
            let res= await getPhoto(p._id.photo);
            return res?.data
          }else{
            return "/profile-logo.jpg"
          }
          
          
        
      });
      const resolvedUrls = await Promise.all(imageUrlPromises);
      console.log(resolvedUrls)
      setImageUrl(resolvedUrls);
    };
  
    fetchMessageUrls();
      
      
  }, [users]);


  //to remove from the shortlisted
  const handleRemove=async(userId:string)=>{
     try{
        await unshortlistusers(params.id,userId,token)
        setselectedusers((prev:string[])=>prev.filter((p)=>p!=userId) )
     }catch(err){
      throw err
     }
  }

  return (
    <div >
        <div className="hidden">
        <Navbar page={false} />  
      </div>{
        loading ?<LoadinPage/>:<>
          <div className="bg-indigo-950 p-5 w-screen flex justify-between">
        <p className='text-white font-extrabold text-2xl cursor-pointer' onClick={()=>router.push("/company")}>Jobee</p>
         <MenuIcon className="text-white md:hidden" onClick={()=>{setstate(true)}}/>
        </div>

      {
        state && 
      
        <div className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50 md:hidden">
        <div className="lg:w-1/4 md:w-40 pl-5  border-r-2 h-screen bg-white">
          
          <div className="flex justify-end m-2" ><CloseIcon onClick={()=>{setstate(false)}}/></div>
            <p className='text-indigo-950 font-extrabold text-xl'>Filter</p>
            <hr/>
            <p className='mt-5 font-bold text-indigo-950' >Status</p>
          <div className='flex mt-3 mr-12'>
            <input type='checkbox' onChange={()=>{handleStatus("Perfect")}} checked={status.includes("Perfect")} />
            <p className=' ml-2 text-slate-500'>Perfect</p>
            </div>
            <div className='flex'>
            <input type='checkbox' onChange={()=>{handleStatus("Good")}} checked={status.includes("Good")} />
            <p className=' ml-2 text-slate-500 '>Good</p>
            </div>
            <div className='flex'>
            <input type='checkbox' onChange={()=>{handleStatus("Bad")}} checked={status.includes("Bad")}  />
            <p className=' ml-2 text-slate-500 ' >Bad</p>
            </div>
            <div className='flex'>
            <input type='checkbox'onChange={()=>{handleStatus("No status")}} checked={status.includes("No status")}  />
            <p className=' ml-2 text-slate-500 '>No status</p>
            </div>
            <div>
              <p>Shortliseted users</p>
            </div>
          </div>
          
        </div>
        }
        <div className="md:flex">
          <div className="lg:w-56 md:w-40 p-5 border-r-2 h-screen hidden md:block">
          
            <p className='text-indigo-950 font-extrabold text-xl'>Filter</p>
            <hr/>
            
            <p className='mt-5 font-bold text-indigo-950'>Status</p>
          <div className='flex mt-3'>
            <input type='checkbox' onChange={()=>{handleStatus("Perfect")}} checked={status.includes("Perfect")}/>
            <p className=' ml-2 text-slate-500'>Perfect</p>
            </div>
            <div className='flex'>
            <input type='checkbox' onChange={()=>{handleStatus("Good")}} checked={status.includes("Good")}/>
            <p className=' ml-2 text-slate-500 '>Good</p>
            </div>
            <div className='flex'>
            <input type='checkbox' onChange={()=>{handleStatus("Bad")}} checked={status.includes("Bad")} />
            <p className=' ml-2 text-slate-500 '>Bad</p>
            </div>
            <div className='flex'>
            <input type='checkbox' onChange={()=>{handleStatus("No status")}} checked={status.includes("No status")}/>
            <p className=' ml-2 text-slate-500 '>No status</p>
            </div>

          </div>
          <div className='lg:flex md:w-full'>
            
          <div className="md:m-7 m-3 md:block lg:hidden">
            {
              job && <Jobdescription job={job} setusers={setusers}/>
            }
             
          </div>
          <div className='  md:mx-7 lg:mx-12 mx-3 lg:w-full'>
            <div className="flex md:hidden justify-end">
            <button className='bg-indigo-950 text-white p-2 rounded-xl' onClick={()=>{!checkbox ? setcheckbox(!checkbox) : handleSelected() }}>
              {checkbox ? "Selected" : "Shortlist"}</button>
            </div>
          
          <div className='flex justify-between items-center my-3'>
          <p className='font-bold lg:ml-5'>Users Who Applied For The Job</p>
            <button className='bg-indigo-950 text-white p-2 rounded-xl hidden md:block' onClick={()=>{!checkbox ? setcheckbox(!checkbox) : handleSelected() }}>
            {checkbox ? "Selected" : "Shortlist"}</button>
           
           </div>
             {
               users.length>0  ? users.map((p:any,index:number)=>{
                  return (
                       <div className='box_shadow p-3  lg:m-5 my-5  rounded-lg lg:w-full '>
                       {
                           checkbox && <div className='flex justify-end cursor-pointer'>
                            <input type='checkbox' className='cursor-pointer' onChange={()=>{handleChange(p._id._id)}} checked={selectedusers&&selectedusers.includes(p._id._id)} />
                          </div>
                       }
                        
                         <div className='md:flex'>
                          <div className='grid place-content-center my-auto rounded-lg'>
                            <Image src={url[index]} width={200} height={200} alt="photo" className="rounded-lg"/>
                            </div>
                            <div className='cursor-pointer mx-5 my-2 ' onClick={()=>{router.push(`/applicant/${p._id.userId._id}`)}}>
                              <div>
                              <p className='font-semibold'>Name:{p._id.userId.username}</p>
                              <p className='font-semibold'>Email :{p._id.userId.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-end items-center'>
                            <button className='border-2 rounded-full px-2 cursor-pointer bg-indigo-950 text-white' onClick={()=>{handleView(p._id.userId._id)}}>View</button>
                            {(selectedusers && selectedusers.includes(p._id._id) ) && checkbox &&  <button className='border-2 rounded-full px-2 cursor-pointer bg-indigo-950 ml-2 text-white' onClick={()=>{handleRemove(p._id._id)}}>Remove</button>
}
                            </div>
                          { view && p._id.userId._id === selectedUserId  &&
                               <div className="fixed top-0 left-0 right-0 bottom-0 flex  bg-slate-800 bg-opacity-50 z-50 ">
                               <UserDetails user={p} setview={setview} id={params.id}/>
                             </div>
                          }
                          
                       </div>
                    )
               }) :<p className='md:text-8xl text-6xl text-center my-32 text-slate-300 font-medium'>No users applied</p>
             }
          </div>
          <div className="lg:m-5 md:my-5 w-1/2 hidden lg:block">
       
              
           
            {
              job && <Jobdescription job={job} setusers={setusers} />
            }
             
          </div>
          </div>
        </div>
        </>
      }
      
      
    </div>
  )
}

export default Page