'use client'
import Navbar from '@/app/components/navbar'
import Profile from '@/app/components/profile'
import React,{useMemo} from 'react'
import { useAppSelector } from '@/redux/store';
import {message} from 'antd'
import ProfileBody from '@/app/components/profileBody';
import { getProfile,updateprofile } from '@/apis/user';
import { useRouter } from 'next/navigation';
import { updateAuth } from '@/apis/auth';
import { useDispatch } from 'react-redux';
import { getAuth, getUser } from '@/redux/features/user-slice';


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
  photo?:string,
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
  const token=useAppSelector((state)=>state.authReducer.value.token)
  const currUser:any= useAppSelector((state) => state.userReducer.value.user);
  const currAuth:{email:string,username:string}=useAppSelector((state)=>state.userReducer.value.auth)
  const router=useRouter()
  const dispatch=useDispatch()

  const handleSubmit=async()=>{
      try{
        
           if(currAuth?.email || currAuth?.username){
            if(currUser?.userId?.email){
             
              await updateAuth(currUser?.userId?.email,currAuth,token)
            }
             
           }
           const res=await updateprofile(userId,currUser,token)
           message.success(res?.data)
           router.push(`/profile/${userId}`)
      }catch(err){
        console.log(err)
      }
  }
  useMemo(() => {
    const fetchData = async () => {
      try {
       
          const res = await getProfile(userId,token)
          console.log({user:res?.data})
        dispatch(getUser(res?.data))
          dispatch(getAuth({email:res?.data.userId.email,username:res?.data.userId.username}))

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);
  return (
    <div>
        <div className='bg-indigo-950'>
        <Navbar page={false}/>
        </div>
        {
          Object.keys(currUser).length>0 &&  <>
            <Profile
            page={false}
          />
          <ProfileBody page={false} 
          />
          <div className='mt-1 flex justify-end'></div>

          <button className="bg-indigo-950 rounded-xl mx-6 text-white p-2 float-right lg:float-left mb-4" onClick={()=>{handleSubmit()}}>Update</button>
          </>
        }
        
    </div>
  )
}

export default Page