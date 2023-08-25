'use client'
import Navbar from '@/app/components/navbar'
import Profile from '@/app/components/profile'
import React,{useState,useEffect,useMemo} from 'react'
import { useAppSelector } from '@/redux/store';
import {message} from 'antd'
import ProfileBody from '@/app/components/profileBody';
import { getProfile,updateprofile } from '@/api/user';
import { useRouter } from 'next/navigation';
import { updateAuth } from '@/api/auth';

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
  const [user, setUser] = useState<UserData | undefined>();
  const [updateProfile,setUpdateProfile]=useState<any>()
  const [auth,setAuth]=useState<{email?:string,username?:string}>();
  const router=useRouter()

  const handleSubmit=async()=>{
      try{
        
           if(auth?.email || auth?.username){
            if(user?.userId?.email){
              await updateAuth(user?.userId?.email,auth,token)
            }
             
           }
           const res=await updateprofile(userId,updateProfile,token)
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
        setUpdateProfile(res?.data)
        setAuth({email:res?.data.userId.email,username:res?.data.userId.username})
        setUser(res?.data);
        
        
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
          user &&  <>
            <Profile
            page={false}
            profile={user.photo || ""}
            name={user.userId?.username || "No username Provided"}
            email={user.userId?.email || "No email Provided"}
            contact={user.phoneNumber?.toString() || "No phoneNumber Provided"}
            location={user.address || "No location Provided"}
            updateProfile={updateProfile}
            setUpdateProfile={setUpdateProfile}
            profileResume={user.resume || ""}
            auth={auth}
            setAuth={setAuth}
          />
          <ProfileBody page={false} 
          profileSummary={user.profileSummary || "Not at mentioned" } 
          skills={user.skills || "Not at mentioned" } 
          experience={user.experience || "Not at mentioned"  } 
          language={user.language || "Not at mentioned" } 
          achievements={user.achievements || "Not at mentioned" } 
          education={user.education || "Not at mentioned" }
          updateProfile={updateProfile}
            setUpdateProfile={setUpdateProfile}
          />
          <div className='mt-1 flex justify-end'></div>

          <button className="bg-indigo-950 rounded-xl mx-6 text-white p-2 float-right lg:float-left mb-4" onClick={()=>{handleSubmit()}}>Update</button>
          </>
        }
        
    </div>
  )
}

export default Page