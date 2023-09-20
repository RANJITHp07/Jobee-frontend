'use client'
import Navbar from '@/app/components/navbar';
import Profile from '@/app/components/profile';
import ProfileBody from '@/app/components/profileBody';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';
import {useDispatch} from "react-redux"
import { AppDispatch } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { logOut } from '@/redux/features/auth-slice';
import CloseIcon from '@mui/icons-material/Close';
import { saveJobs } from '@/redux/features/save-slice';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import EditIcon from '@mui/icons-material/Edit';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useRouter} from "next/navigation"
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { createProfile } from '@/apis/user';
import Footer from '@/app/components/footer';
import { loadingItems} from '@/redux/features/loading-slice';
import LoadinPage from '@/app/components/loadinPage';
import { savedJobs } from '@/apis/save';
import {getUser } from '@/redux/features/user-slice';
import { getPhoto } from '@/apis/company';


interface UserData {
  _id?: string;
  userId?: {
    _id?: string;
    username?: string;
    email?: string;
    role?: string;
    admin?: boolean;
  };
  address?: string;
  phoneNumber?: number;
  photo?:string
  profileSummary?: string;
  skills?: string[];
  education?: string;
  experience?: string;
  language?: string[];
  achievements?: string;
  resume?:string
}


function Page() {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const saved: any[] = useAppSelector((state) => state.saveReducer.value.saved);
  const token=useAppSelector((state)=>state.authReducer.value.token)
  const loading:Boolean=useAppSelector((state)=>state.loadingReducer.value.loading)
  const currUser=useAppSelector((state)=>state.userReducer.value.user)
  const [url,setImageUrl]=useState<any>([])

  const [menu,setmenu]=useState(false)
 
 
  const dispatch=useDispatch<AppDispatch>()
  const router=useRouter()

  
  // to fetch the user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(userId){
          const res:any = await createProfile(userId,token)
          dispatch(getUser(res.data))
          console.log(res.data)
        }
        dispatch(loadingItems())
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);


// to fetch the saved jobs
  useEffect(()=>{
    const fetchData = async () => {
      try {
        if(userId){
          const res = await savedJobs(userId,token)
          const imageUrlPromises = res.data.saved.map(async (p:any) => {
              const res=await getPhoto(p.company.logo)
            return res?.data;
            
          
        });
    
        const resolvedUrls = await Promise.all(imageUrlPromises);
        
        setImageUrl(resolvedUrls);
          dispatch(saveJobs(res.data.saved))
          
        }
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  },[userId])

  return (
  
    <div>
      {
        loading ? <LoadinPage/> : <>
         <div className="bg-indigo-950">
        <Navbar page={true} />
      </div>
      
      <div className="lg:flex ">
        <div className="hidden lg:block md:w-56 lg:w-72 border-2 pt-6">
        <p className='font-bold mx-3 text-slate-600'>Welcome {currUser?.userId?.username}</p>
          <hr className='border-1 border-indigo-950 mb-6' />
        <div className=' flex items-center p-2 hover:bg-slate-200 hover:rounded-lg hover:p-3 hover:mx-2'><a href='/profile/update' className='font-semibold mx-3   text-slate-600'><EditIcon/>Update</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-200 hover:rounded-lg hover:p-3 hover:mx-2'><a href="/chat" className='font-semibold mx-3 text-slate-600'><MarkUnreadChatAltIcon/>Chat</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-200 hover:rounded-lg hover:p-3 hover:mx-2'><a href="#saved" className='font-semibold mx-3 text-slate-600'><BookmarksIcon/>Saved</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-200 hover:rounded-lg hover:p-3 hover:mx-2'><a href={currUser && `/profile/status?id=${currUser._id}`} className='font-semibold mx-3 text-slate-600'><PendingActionsIcon/>Application Status</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-200 hover:rounded-lg hover:p-3 hover:mx-2'><a className='font-semibold mx-3 text-slate-600' onClick={()=>{
          dispatch( logOut())
          localStorage.removeItem("token")
          router.push("/login")}}><ExitToAppIcon/>Logout</a></div>
          </div>
          <div className='flex justify-end lg:hidden'><button className='bg-indigo-950 text-white rounded-lg p-2 m-2 flex justify-end' onClick={()=>setmenu(true)}>MENU</button></div>
          {
            menu && 
            <div className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50">
               <div className=" bg-white md:w-1/2 border-2 ">
                <div className="flex justify-end mb-5 mt-2"><CloseIcon className="cursor-pointer" onClick={()=>setmenu(false)}/></div>
        <p className='font-bold mx-3 text-slate-600'>Welcome {currUser?.userId?.username}</p>
          <hr className='border-1 border-indigo-950' />
        <div className=' flex items-center p-2 hover:bg-slate-100 '><a href='/profile/update' className='font-semibold mx-3 mt-6 text-slate-600'><EditIcon/>Update</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><a href="/chat" className='font-semibold mx-3 text-slate-600'><MarkUnreadChatAltIcon/>Chat</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><a href="/chat" className='font-semibold mx-3 text-slate-600'><MarkUnreadChatAltIcon/>Saved</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><a href={currUser && `/profile/status?id=${currUser._id}`} className='font-semibold mx-3 text-slate-600'><PendingActionsIcon/>Application Status</a></div>
          <div className=' flex items-center my-2 p-2 hover:bg-slate-100'><a href='/login' className='font-semibold mx-3 text-slate-600 cursor-pointer' 
          onClick={()=>{
          dispatch( logOut())
          localStorage.removeItem("token")
          router.push("/login")}}><ExitToAppIcon/>Logout</a></div>
          </div>
            </div>
          }
        <div className=" lg:w-8/12 lg:mx-8">
        {Object.keys(currUser).length>0 && (
        <>
       <Profile page={true} />
          <ProfileBody page={true} />
        </>
      )}
          <div className='mx-5 my-3 box_shadow p-5 rounded-lg' id="saved">
            <div className='flex justify-between'>
            <p className='font-bold text-sm text-slate-600'>SAVED JOBS</p>
            {
               !saved[0]  &&  <p className='font-bold text-xs text-slate-600'>No saved posts</p>
            }
            
            </div>
              <hr/>
              {
               saved.length >0 && saved[0].map((p:any,index:number)=>{
                
                  return(
                  
                    <div className='my-3 cursor-pointer' onClick={()=>router.push(`/job/${p._id}`)} >
                       <div className='flex justify-between'>
                        <div className='my-3'>
                        <p className='text-medium'>Role: {p.role}</p>
                        <p className='text-medium'>Location: {p.location}</p>
                        </div>

                       
                       { url.length >0 && <Image src={url[index]} width={100} height={100} alt='' className='mb-2 h-16 w-16 rounded-lg'/>}
                       </div>
                       <hr/>
                    </div>
                  )
                })
              }
              
           </div>
          
        
        </div>
        
      </div>
      <div className="mt-8">
      <Footer/>
      </div>
       
        </>
      }
      
      
    </div>
  );
}

export default Page;
