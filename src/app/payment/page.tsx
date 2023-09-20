'use client'
import React,{useEffect,useState}from 'react'
import Payment from '../components/payment'
import { useAppSelector } from '@/redux/store';
import Navbar from '../components/navbar';
import { useRouter } from 'next/navigation';
import { getPlans,getUsepayment, payment } from '@/apis/payments';
import LoadinPage from '../components/loadinPage';




function Page() {
  const [loading,setloading]=useState(true)
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const token= useAppSelector((state) => state.authReducer.value.token);
  const router=useRouter()
  const [plan,setplan]=useState([])
  const [user,setuser]=useState<any>()

  useEffect(()=>{
    const fetchData=async()=>{
      let response
      let res
      (userId && token) ? response=await getUsepayment(userId,token) :""
      console.log(response?.data)
      response?.data? res=await payment(response.data.stripeCustomerId,token) :""
      
       if(res?.data===true){
          router.push("/job/form")
       }else{
         setloading(false)
       }
       console.log(response?.data)
         setuser(response?.data)
         

    }
    fetchData()
    
},[userId,token])

  useEffect(()=>{
    const fetchData=async()=>{
      
         const res=await getPlans()
         setplan(res.data?.data)
       
         
    }
    fetchData()
   
},[])


  return (
    <div className=''>
       <div className="hidden">
        <Navbar page={false} />
      </div>
      {
        loading ? <LoadinPage/>

        :
        <> <div className="bg-indigo-950 p-5 w-screen">
        <p className='text-white font-extrabold text-2xl'>Jobee</p>
        </div>
       <div className='md:flex mx-5 mt-12 justify-center items-center'>
        {
          Array.isArray(plan) && plan.map((p:any)=>{
            
           if(p.active){
              
            return <Payment name={p.nickname} id={p.id} stripeId={user && user.stripeCustomerId}/>
           }
           
          })
        }
        </div></>
      }
      
        
    </div>
  )
}

export default Page