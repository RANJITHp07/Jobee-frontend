'use client'
import React,{useEffect,useState} from "react"
import Image from 'next/image'
import Navbar from './components/navbar'
import Header from './components/header'
import Slider from './components/slider'
import { useAppSelector } from "@/redux/store"
import { useRouter } from "next/navigation"
import LoadinPage from "./components/loadinPage"
import { useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import { loadingItems } from "@/redux/features/loading-slice"


const Footer = dynamic(() => import('./components/footer'));
const Companies= dynamic(() => import('./components/companies'));
const Detail = dynamic(() => import('./components/detail'));

export default function Home() {


  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const loading:Boolean=useAppSelector((state)=>state.loadingReducer.value.loading)
  const token=useAppSelector((state) => state.authReducer.value.token)
  const dispatch=useDispatch()
  const router=useRouter()

  useEffect(()=>{
     const fetchData=async()=>{
      const storedToken:any = localStorage.getItem('token');
    if(storedToken!==null){
      const parsedToken: any = JSON.parse(storedToken);
      if(parsedToken?.user.role==='recruiter'){
        router.push("/company");
      }else{
        dispatch(loadingItems())
      }
        
         
    }else{
      dispatch(loadingItems())
    }
         
     }
     fetchData()
     
  },[userId])
  
  return (
     <div>
      { loading? <LoadinPage/> : <>
      <div>
        <div className="bg-[url('/background.png')] bg-no-repeat bg-cover w-screen">
        <Navbar page={false}/>
  <hr className='bg-white border-3'/>
  <Header />
        </div >
        <div className='my-12'  data-aos="fade-right" data-aos-delay="500" data-aos-duration="800">
        <p className='text-indigo-950 text-center font-extrabold text-xl'>CATEGORY</p>
        <p className='text-center text-sm mx-3 mb-12 text-slate-500 md:text-xl md:mx-5 md:font-semibold'>Experience the enchantment of our captivating selection in the category we provide</p>
           <Slider/>
           
        </div>
        
        <Detail/>
       
        

        <p className='text-indigo-950 text-center font-extrabold text-xl mt-12'>BEST COMPANIES WE PROVIDE</p>
        <p className='text-center text-sm mx-3 mb-5 md:mb-12 text-slate-500 md:text-xl md:mx-5 md:font-semibold'>Emphasizing Values and Mission</p>
        <Companies/>

        <div className="grid place-content-center">
  <button className="border-2 border-indigo-950 font-semibold rounded-full p-2 my-5" onClick={()=>router.push("/companies")}>VIEW MORE</button>
</div>
<div>
<p className='text-indigo-950 text-center font-extrabold text-xl mt-8'>SERVICES WE PROVIDE</p>
        <p className='text-center text-sm mx-3 mb-5 md:mb-12 text-slate-500 md:text-xl md:mx-5 md:font-semibold'>Comprehensive Solutions Tailored to Your Needs</p>
        <div  className='grid place-content-center' data-aos="fade-up">
        <Image src={'/services.png'} width={1000} height={1000} alt='photo'/>
        </div>
</div>
<Footer/>
         </div>
         </> }
     </div>
  )
}
