'use client'
import React, {useState,useEffect, ChangeEvent} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image"
import { getConvo } from '@/apis/chat';
import { useAppSelector } from '@/redux/store';




function Users({setShowFilter,userId,setid,setrecieverId,setusername}:{setShowFilter: React.Dispatch<React.SetStateAction<boolean>>,userId:string,setid: React.Dispatch<React.SetStateAction<null>>,setrecieverId: React.Dispatch<React.SetStateAction<string>>,setusername: React.Dispatch<React.SetStateAction<string>>}) {

  const [users,setusers]=useState<any>([])
  const token=useAppSelector((state)=>state.authReducer.value.token);
  const [friends,setfriends]=useState([])
  

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    if(e.target.value.length!=0 && friends.length>0){
     
     const newFilter = users.filter((value:any) => {
      if(value.members[0]._id===userId){
        return value.members[1].username.toLowerCase().includes(e.target.value.toLowerCase());
      }else{
        return value.members[0].username.toLowerCase().includes(e.target.value.toLowerCase());

      }
       
     });
     setfriends(newFilter)
    }
    else if(friends.length===0){
   
       setfriends(users)
    }else{
      setfriends(users)
    }
   }

  useEffect(()=>{
    async function fetchData(){
      try{
         if(userId){
          
          const res=await getConvo(userId,token)
            
            res.data.length>0 && setid(res.data[0]._id)
            res.data.length>0 && setrecieverId(userId===res.data[0].members[0]._id?res.data[0].members[1]._id:res.data[0].members[0]._id)
            res.data.length>0 && setusername(userId===res.data[0].members[0]._id?res.data[0].members[1].username:res.data[0].members[0].username)
          setusers(res.data)
          setfriends(res.data)
         }
      }catch(err){
        throw err
      }
    }
    fetchData()
  },[userId])

  return (
    <div className="w-3/4 md:w-1/2 bg-white h-screen   lg:w-full lg:border-r-2 border-slate-200">
        <div className='flex justify-end m-2 lg:hidden'>
        <CloseIcon onClick={()=>{setShowFilter(false)}}/>
        </div>
        <div className='bg-slate-100 rounded-full w-11/12 mx-auto  px-3 py-1 flex items-center lg:mt-8'>
            <SearchIcon className='text-slate-400 mx-2'/>
            <input type='text' placeholder='Search' className='bg-slate-100 w-3/4  focus:outline-none text-slate-600' onChange={handleChange}/>
        </div>
        
        {
            users.length >0 ?friends.map((p:any)=>{
                return(<>
        <div className='mx-5 my-4 flex items-center cursor-pointer hover:bg-slate-100 hover:p-2 hover:rounded-lg' onClick={()=>{
          setid(p._id)
          setrecieverId(p.members[0]._id===userId ? p.members[1]._id :p.members[0]._id)
          setusername(p.members[0]._id===userId ? p.members[1].username :p.members[0].username)
        }}>
            <Image src={'/person.jpg'} width={40} height={40} alt="photo" className="rounded-full border-2 mr-3"/>
               <div>
               <p>{p.members[0]._id===userId ? p.members[1].username :p.members[0].username }</p>
               {p.latestMessage!='' ?<p className='text-xs'>lastest message : {p.latestMessage.slice(0,10)}...</p>:<p></p>}
                  
               </div>      
        </div>
        <hr/>
        </>
        )
      }) :<p className="my-5 text-slate-300 mx-16 text-xl text-center">No contacts yet </p>
    }
    </div>
  )
}

export default Users