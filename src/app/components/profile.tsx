import React, { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { message } from 'antd';
import { useAppSelector } from '@/redux/store';
import { upload,updateProfilephoto} from '@/api/user';
import Person3Icon from '@mui/icons-material/Person3';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface ProfileProps {
  page: boolean;
  profile:string;
  name: string;
  email: string;
  contact: string;
  location: string;
  updateProfile?:any,
  profileResume?:string
  setUpdateProfile?: React.Dispatch<React.SetStateAction<any>>
  auth?:{email?:string,username?:string}
  setAuth?: React.Dispatch<React.SetStateAction<{
    email?: string | undefined;
    username?: string | undefined;
} | undefined>>
}

function Profile({ page,profile, name, email, contact, location,setUpdateProfile,updateProfile,setAuth,auth,profileResume}: ProfileProps) {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const token=useAppSelector((state) => state.authReducer.value.token)
  const [file, setFile] = useState<File | null>(null);
  const [resume, setresume] = useState<File | null>(null);


  const handleResume=async(e:ChangeEvent<HTMLInputElement>)=>{
    try {
      if (e.target.files){
        
        const formData = new FormData();
        formData.append('file',e.target.files[0]);

        const response =await upload("resume",formData,token)
        console.log(response.data)
        await updateProfilephoto(userId,response.data,"",token)
        if(setUpdateProfile && updateProfile){
          
          setUpdateProfile({...updateProfile,resume:response.data})
       }
    
        message.success('Successfully Updaloaded the Resume');
        
    }
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        setFile(e.target.files[0])
        const formData = new FormData();
        formData.append('file',e.target.files[0]);
        const response = await upload("id",formData,token);
        
        const res=await updateProfilephoto(userId,response.data,"profile",token)
        console.log(res.data)
        if(setUpdateProfile && updateProfile){
          
           setUpdateProfile({...updateProfile,photo:response.data})
        }
        message.success('Successfully Updated the profile');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`m-5 box_shadow p-5 rounded-lg  ${page? "" : "lg:w-12/12 "}`}>
      
      <div className="grid place-content-center  md:flex  md:justify-between">
        {page ? (
          <div className="md:flex-shrink-0  md:w-2/5">
            <Image src={ profile!=''?profile:'/profile-logo.jpg'} width={300} height={300} alt="photo" className="rounded-xl" />
             
          </div>
        ) : (
          <div className={`bg-cover mt-8 mb-5 p-5 mx-5 border-4 border-dotted border-slate-400 grid place-content-center md:w-1/2 lg:w-1/2`}>
            <label htmlFor="file">
            {file ? (
          <Image src={URL.createObjectURL(file)} width={500} height={500} alt="photo" className="rounded-xl" />
        ) : (
          <Image src={ profile!=''?profile :"/uploads.jpg"} width={profile!=''?300:200} height={200} alt="photo" className="rounded-xl cursor-pointer" />
        )}
            </label>
            <input type="file" name="file"  id="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {handleUpload(e)}} className='hidden'/>
            
          </div>
        )}
        <div className={`${page ? "": "p-3"} md:w-1/2 ml-3 my-auto md:ml-7 mt-2`}>
          <p className="font-bold text-xl text-slate-500">
           <Person3Icon/>Name: {page ? <span className="text-medium text-slate-700 font-semibold">{name}</span> : <input type="text" className=" sm:w-1/2  md:w-full p-2 font-medium text-slate-400 rounded-xl border-2 border-slate-700 my-2" defaultValue={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{if(setAuth)setAuth({...auth,username:e.target.value})}} />}
          </p>
          <p className="font-bold text-xl text-slate-500">
           <MailIcon/>Email Id: {page ? <span className="text-medium text-slate-700 font-semibold">{email}</span> : <input type="text" className=" sm:w-1/2 md:w-full font-medium text-slate-400   p-2 rounded-xl border-2 border-slate-700 my-2" defaultValue={email} 
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{if(setAuth && auth)setAuth({...auth,email:e.target.value})}}/>}
          </p>
          <p className="font-bold text-xl text-slate-500">
           <CallIcon/>Contact: {page ? <span className="text-medium text-slate-700 font-semibold">{contact=="0" ?"Not Mentioned": contact}</span> : <input type="text" className=" sm:w-1/2 md:w-full font-medium text-slate-400  p-2 rounded-xl border-2 border-slate-700 my-2" defaultValue={contact==='0' ? "Not mentioned" : contact} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{if(setUpdateProfile && updateProfile)setUpdateProfile({...updateProfile,phoneNumber:e.target.value})}} />}
          </p>
          <p className="font-bold text-xl text-slate-500">
           <LocationOnIcon/>Location: {page ? <span className="text-medium text-slate-700 font-semibold ">{location}</span> : <input type="text" className=" sm:w-1/2 md:w-full p-2 rounded-xl font-medium text-slate-400  border-2 border-slate-700 my-2" defaultValue={location} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{if(setUpdateProfile && updateProfile)setUpdateProfile({...updateProfile,address:e.target.value})}} />}
          </p>
          {
            !page ?
            <div className="my-5">
              {
                profileResume==='' ? <label htmlFor="resume" className='border-2 border-slate-700 bg-indigo-950 text-white rounded-lg p-2'>{resume ? resume.name : "Upload Your Resume"}</label>:
                <label htmlFor="resume" className='border-2 border-slate-700 bg-indigo-950 text-white rounded-lg p-2'>{profileResume}</label>


              }
          <input type="file"  name="resume" accept=".pdf" id="resume" className="hidden" onChange={(e:ChangeEvent<HTMLInputElement>)=>handleResume(e)}/>
          </div> :<div className="my-3">
            {
              profileResume!=''?<a href={profileResume} target="_blank" rel="noopener noreferrer" className=" text-white font-semibold bg-indigo-950 p-2 rounded-lg ">Your Resume</a>
              :<p></p>
            }
           </div>
          }
      
          
        </div>
      </div>
      
    </div>
  );
}

export default Profile;
