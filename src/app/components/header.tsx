'use client'
import React,{useState,useEffect, ChangeEvent, useRef} from 'react'
import Image from 'next/image'
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Iframe from 'react-iframe';
import ClearIcon from '@mui/icons-material/Clear';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import AOS from 'aos'
import { getLocations, getRoles } from '@/apis/job';
import { message } from 'antd';

function Header() {
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const username=useRef<HTMLInputElement>(null)
  const [search,setsearch]=useState('')
  const [roles,setroles]=useState([])
  const [state,setstate]=useState(false)
  const [filter,setfilter]=useState([])
  const [locationstate,setlocationstate]=useState(false)
  const [locationsearch,setlocationsearch]=useState('')
  const [locationFilter,setLocationFilter]=useState<string[]>([])
  const [location,setlocation]=useState([])
  const router=useRouter()

  const handleJob=()=>{
    if(locationFilter.length===0){
       router.push(`/job?search=${search}`)
    }else{
      if(filter.length===0){
        message.info("Enter the role")
      }else{
        router.push(`/job?role=${search}&location=${locationsearch}`)
      }
      
    }
  }

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    try{
      
     if(e.target.value.length!=0 && filter.length>0){
      setsearch(e.target.value)
      setstate(true) 
      const newFilter = roles.filter((value:string) => {
        return value.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setfilter(newFilter)
     }
     else if(filter.length===0){
        setfilter(roles)
     }
     else{
      setsearch('')
      setstate(false)
     }
       
    }catch(err){
      throw err
    }
  }

  const handlelocationChange=(e:ChangeEvent<HTMLInputElement>)=>{
    try{
      
     if(e.target.value.length!=0 && locationFilter.length>0){
      setlocationsearch(e.target.value)
      setlocationstate(true) 
      const newFilter = location.filter((value:string) => {
        return value.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setLocationFilter(newFilter)
     }
     else if(locationFilter.length===0 && e.target.value.length >0){
        setLocationFilter(location)
     }
     else{
      setlocationsearch('')
      setlocationstate(false)
     }
       
    }catch(err){
      throw err
    }
  }

  useEffect(() => {
    
    AOS.init();
  }, []);


  useEffect(()=>{
    const fetchData=async()=>{
      const res=await getRoles()
      setroles(res.data)
      
    }
    fetchData()
  },[])

  useEffect(()=>{
    const fetchData=async()=>{
      const res=await getLocations()
      setlocation(res.data)
    }
    fetchData()
  },[])

  const handleImageClick = () => {
    setIsIframeVisible(!isIframeVisible);
  };
  return (
    <div>
      
      <div className='grid place-content-center mt-8 md:hidden'>
         <p className='text-center text-slate-300 text-4xl font-extrabold mx-5 leading-10'>The Smartest<br /> Way To Get Your<br/> Dream<span className='text-blue-300'> Job</span></p>
         <Image src={'/job_portal.png'} width={500} height={200} alt="phoneHeader" data-aos="zoom-out" data-aos-delay="200" data-aos-duration="800" />
         <div className='flex justify-center items-center'>
          {
              !userId &&     <>  <button type='submit' className='rounded-full bg-indigo-700 text-white mx-2 px-9 py-1 text-xl font-bold' onClick={()=>router.push("/login")}>Login</button>
                     <button type='submit' className='rounded-full bg-indigo-700 mx-2 text-white px-9 py-1 text-xl font-bold'  onClick={()=>router.push("/signin")}>SignIn</button></>
          }
         
         </div>
         <div className='rounded-full p-5 mb-5'>
          <form className='flex justify-center items-center bg-white p-2 rounded-full'>
          <WorkIcon className='text-slate-300 mx-2'/>
          <input type='text' placeholder='Enter Your Dream Job' className='outline-none focus:outline-non' value={search} onChange={handleChange} ref={username}/>
          {
           state &&  <div className='absolute hidden md:block  bg-white h-40 overflow-y-scroll md:w-60 rounded-lg overflow-hidden p-3 box_shadow'>
             {
              filter.length>0 ? filter.map((p)=>{
                 return(
                   <p className='hover:bg-slate-200 p-2' onClick={()=>{
                    setsearch(p)
                     setstate(false)
                     username.current && username.current.focus()
                     
                    }}>{p}</p>
                 )
               }) :<p className='text-slate-300'>No matching roles</p>
             }
           </div>
         } 
           <button type='submit' className='rounded-full bg-indigo-950 text-white font-medium p-2'>Search</button>
          </form>
          {
           state &&  <div className='absolute  md:hidden bg-white h-40 z-50    overflow-y-scroll w-72 ml-7 rounded-lg overflow-hidden p-3 box_shadow'>
             {
              filter.length>0 ? filter.map((p)=>{
                 return(
                   <p className='hover:bg-slate-200 p-2' onClick={()=>{
                    setsearch(p)
                     setstate(false)
                     username.current && username.current.focus()
                     
                    }}>{p}</p>
                 )
               }) :<p className='text-slate-300'>No matching roles</p>
             }
           </div>
         } 
         </div>
      </div>
       <div  className='hidden md:flex' >
       <div className='w-1/2'>
       <p className=' text-slate-300 text-4xl font-extrabold  leading-10  md:ml-8 md:mt-12  lg:text-6xl headerSize lg:mt-24' data-aos="zoom-out" data-aos-delay="200" data-aos-duration="800">The Smartest<br/> Way To Get Your<br className=' block lg:hidden' /> Dream<span className='text-blue-300'> Job</span></p>
         <p className='text-slate-300 ml-8 mt-3 mr-5'  data-aos="zoom-out" data-aos-delay="400" data-aos-duration="800"><span className='text-blue-300'>Jobee </span > opens doors to a world of endless career opportunities </p>
         <div className='flex  bg-white p-2 rounded-full ml-5 mt-7 md:w-10/12 lg:w-11/12  btn'>
          <div className='flex justify-center items-center ml-5'>
            <div>
              <div className='flex'>
              <WorkIcon className='text-slate-300 mr-2'/>
          <input type='text' placeholder='Enter Your Dream Job' className='outline-none focus:outline-non  md:w-3/4' value={search} onChange={handleChange}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
               handleJob()
            }
          }}
          />
              </div>
            
         {
           state &&  <div className='absolute  bg-white h-40 overflow-y-scroll md:w-60 rounded-lg overflow-hidden p-3 box_shadow'>
             {
              filter.length>0 ? filter.map((p)=>{
                 return(
                   <p className='hover:bg-slate-200 p-2' onClick={()=>{
                    setsearch(p)
                     setstate(false)
                     username.current && username.current.focus()
                     
                    }}>{p}</p>
                 )
               }) :<p className='text-slate-300'>No matching roles</p>
             }
           </div>
         } 
            </div>
          <div>
             <div className='lg:flex hidden'>
             <LocationOnIcon className='text-slate-300 mr-2 hidden lg:block'/>
          <input type='text' placeholder='Search your Location' className='outline-none focus:outline-non md:w-3/4  hidden lg:block' value={locationsearch} onChange={handlelocationChange}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
               handleJob()
            }
          }}
          />
             </div>
             {
           locationstate &&  <div className='absolute  bg-white h-40 overflow-y-scroll md:w-56 rounded-lg overflow-hidden p-3 box_shadow'>
             {
              locationFilter.length>0 ? locationFilter.map((p)=>{
                 return(
                   <p className='hover:bg-slate-200 p-2' onClick={()=>{setlocationsearch(p)
                     setlocationstate(false)}}>{p}</p>
                 )
               }) :<p className='text-slate-300'>No matching location</p>
             }
           </div>
         } 
          </div>
         
          </div>
            <button type='submit' className='rounded-full bg-indigo-950 ml-auto text-white font-medium p-2  ' onClick={()=>{handleJob()}} >Search</button>
          </div>
          
         </div>
         <div className='w-1/2'>
           <Image src={'/job_portal.png'} width={700} height={250} alt="phoneHeader"  />
         </div> 
         
         <div className="fixed bottom-4 right-4 z-50">

          {isIframeVisible && (<>
            <p className='flex justify-end cursor-pointer' onClick={()=>{setIsIframeVisible(! isIframeVisible)}}><ClearIcon/></p>
          <Iframe
            url="https://console.dialogflow.com/api-client/demo/embedded/88e67dbc-1bcd-4d61-aff1-2f0fc9a265dd"
            width="350"
            height="430"
            allow="microphone;"
          />
          </>
        )}
          </div>
        <div className="fixed bottom-4 right-4 z-50">
          {
            ! isIframeVisible && <Image
            src={"/dialog_flow.jpg"}
            width={100}
            height={100}
            alt="Toggle Image"
            onClick={handleImageClick}
            className='rounded-full cursor-pointer'
          />
          }
        </div>
      </div>         


    </div>
  )
}

export default Header