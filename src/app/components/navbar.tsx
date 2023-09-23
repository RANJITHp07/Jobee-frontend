'use client'
import Link from 'next/link';
import Image from 'next/image';
import React, { useState,useEffect, ChangeEvent,useRef} from 'react';
import {  Badge, message } from 'antd';
import MenuIcon from '@mui/icons-material/Menu';
import { BellOutlined } from '@ant-design/icons';
import { logIn } from '@/redux/features/auth-slice';
import {useDispatch} from "react-redux"
import { AppDispatch } from '@/redux/store';
import type { MenuProps } from 'antd';
import { Dropdown} from 'antd';
import {useRouter} from 'next/navigation';
import { logOut } from '@/redux/features/auth-slice';
import { useAppSelector } from '@/redux/store';
import 'aos/dist/aos.css';
import { io, Socket } from 'socket.io-client';
import AOS from 'aos'
import {Modal} from 'antd'
import ProfileMenu from './profileMenu';
import { getRoles } from '@/apis/job';
import { chatNotification, deleteAllNotification } from '@/apis/chat';
import { loadingItems } from '@/redux/features/loading-slice';
import SearchIcon from '@mui/icons-material/Search';



 

function Navbar({page}:{page:boolean}) {
  const roomId=useAppSelector((state)=>state.modalReducer.value.roomId)
  const [roles,setroles]=useState<any>([])
  const [open,setopen]=useState(false)
  const [token,setToken]=useState<any>({})
  const [notification,setnotification]=useState([])
  const [model,openmodel]=useState(false)
  const [state,setstate]=useState(false)
  const [filter,setfilter]=useState<string[]>([])
  const [role,setrole]=useState<string>('')
  const socket = useRef<Socket | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router=useRouter()
  const dispatch=useDispatch<AppDispatch>()

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
   
    if (e.key === 'Enter') {
     
      router.push(`/job?search=${role}`)
    
      setrole('')
    }
  };



  const handleMarkasread=async()=>{
      try{
           const res=await deleteAllNotification(token.user?.userId)
           setnotification([])
           message.info(res.data)
           openmodel(false)
      }catch(err){
        throw err
      }
  }

  useEffect(() => {
    AOS.init();
  }, []);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a  href={`/profile/${token.user?.userId}`}>
          Profile
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <p  onClick={()=>{
          dispatch( logOut())
          localStorage.removeItem("token")
          router.push("/login")}}>
          Logout
        </p>
      ),
    },
    
  ];
 
  useEffect(()=>{
    const fetchData=async()=>{
      const res=await getRoles()
     
      setroles(res.data)
      
    }
    fetchData()
  },[])

  useEffect(() => {

      const storedToken = localStorage.getItem('token');
      if (storedToken !== null) {
        const parsedToken: any = JSON.parse(storedToken);
        dispatch(logIn({userId:parsedToken.user.userId,token:parsedToken.user.token}))
        setToken(parsedToken);
          dispatch(loadingItems())
          const fetchData=async()=>{
            const res=await chatNotification(parsedToken.user.userId)
           
            setnotification(res.data)
          }
          fetchData()
        

    }
  }, [model]);

  //filter

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    try{
      if(e.target.value.length!=0 && filter.length>0){
        setstate(true)
         setrole(e.target.value)
       const newFilter = roles.filter((value:string) => {
         return value.toLowerCase().includes(e.target.value.toLowerCase());
       });
       setfilter(newFilter)
      }
      else if(filter.length===0){
       setstate(true)
         setfilter(roles)
         
      }else{
       setstate(false)
       setrole('')
      }
     
    }catch(err){
      throw err
    }
  }

  return (
    <nav >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href={'/'} className='text-slate-300 font-extrabold text-lg md:text-xl lg:text-3xl m-3' >Jobee</Link>
          </div>
          <div className="hidden md:block mx-auto">
            <div className="ml-10 flex space-x-4">
              <Link href="/" className="text-white font-bold lg:font-extrabold hover:text-slate-300">HOME</Link>
              <Link href="/job" className="text-white font-bold lg:font-extrabold hover:text-slate-300">JOB</Link>
              <Link href="/companies" className="text-white font-bold lg:font-extrabold hover:text-slate-300">COMPANY</Link>
            </div>
          </div>
            <div className='bg-white  hidden rounded-full lg:block'>
             {
              page &&
              <div className='bg-white rounded-full py-2 px-3 flex '>
                <SearchIcon className='text-slate-400'/>
                 <input type="text" placeholder="Search you job" className='focus:outline-none' value={role} autoFocus  onChange={handleChange} onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>)=>handleInputKeyDown(e)} ref={inputRef}/>
                 {
                    state && <div className='absolute box_shadow bg-white p-3 rounded-lg top-20 w-56 z-50'>
                   { filter.length>0 ? filter.map((p:string)=>{
                       return (
                        <>
                         <p className='my-3 cursor-pointer' onClick={()=>{
                          setrole(p)
                          setstate(false)
                          inputRef.current?.focus()
                        }
                         }>{p}</p>
                         <hr/>
                        </>
                       
                       )
                     }): <p>No such role</p>
                    }
                 
                 </div>
                  }
              </div>
             }
      </div>
    
     
        {
           ! token.user?.userId ?  <div className='hidden md:block'>
          <Link href={"/signin"}> <button className='rounded-xl bg-indigo-700 text-white mx-2 px-4 py-1 text-medium font-semibold'>Sign In</button></Link> 
           <Link href={"/login"}><button className='rounded-xl bg-indigo-700 text-white mx-2 px-4 py-1 text-medium font-semibold'>Login</button></Link>
         </div> :
         <div className='md:flex ml-3 hidden'>
          
           <Badge count={notification.length} style={{ backgroundColor: 'green' }}>
      <BellOutlined className="text-white text-3xl" onClick={()=>openmodel(true)}/>
    </Badge>
   
    <Dropdown menu={{ items }} placement="bottom" arrow>
    <Image src={'/profile-logo.jpg'} width={40} height={40} alt="profile" className='rounded-full ml-5'/>
    </Dropdown>
    <Modal title="Notification" footer={null} open={model} onOk={()=>openmodel(false)} onCancel={()=>openmodel(false)}>
     {
  notification.map((p:any, index) => {
   
    
    return (
      <div className='my-3 cursor-pointer' onClick={()=>router.push("/chat")}>
      <p className=' text-xs font-semibold text-slate-400' >{p.user_id.username}</p>
      <p className='mb-3 text-xs' >Message: {p.message.slice(0,10)}</p>
      <hr />
      </div>
      
    );
  })
}
<button className='border-2 p-2 rounded-lg text-xs' onClick={()=>handleMarkasread()}>Mark as read</button>
</Modal>
    
          </div>
        }
        <div className='md:hidden text-white cursor-pointer hover:text-slate-400' onClick={()=>{setopen(true)}}><MenuIcon/></div>
        { open &&
          <div
            className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50"
          >
           <ProfileMenu setopen={setopen}/>
          </div>
         }
        
        </div>
      </div>

      
    </nav>
  );
}

export default Navbar;
