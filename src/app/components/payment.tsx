import axios from 'axios';
import React from 'react'
import {useRouter} from "next/navigation"
import Image from "next/image"
import { useAppSelector } from '@/redux/store';

interface Plan {
  name: string;
  price: string;
  month: number;
  image:string
}

interface Plans {
  [key: string]: Plan;
}



function Payment({name,id,stripeId}: {name: keyof Plans,id:string,stripeId: string}) {

  const token=useAppSelector((state)=>state.authReducer.value.token)
  const router=useRouter()

  const plans: Plans = {
    Basic: {
      name: "Basic",
      price: "10.00",
      month: 1,
      image:"basic.jpg"
    },
    Standard: {
      name: "Standard",
      price: "25.00",
      month: 3,
      image:"standard.jpg"
    },
    Premium: {
      name: "Premium",
      price: "50.00",
      month: 6,
      image:"premium.jpg"
    }
  };

  
  const selectedPlan = plans[name];
  console.log(selectedPlan)
  
 
  const handleClick=async()=>{
    try{
        console.log(id,stripeId)
         const res=await axios.post("https://www.jobeee.website/v1/api/plans",{priceId:id,stripeId:stripeId},
          {
            headers: {
                Authorization: token,
            },
        }
         )
         console.log(res.data.url)
         router.push(res.data.url)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className={name==="Intermediate"?"box_shadow p-5 mx-3 rounded-xl my-5 lg:py-12" :"box_shadow p-5 my-5 mx-3 rounded-xl border-2"}>
     
        {
          selectedPlan &&

          <>
           <div className="grid place-content-center">
      <Image src={`/${selectedPlan.image}`} width={100} height={100} alt="photo" className="rounded-full grid place-content-center my-6" />
      </div>
      <p className='text-center text-2xl font-bold text-indigo-950'>{selectedPlan.name}</p>
      
      <p className='text-center text-xl font-bold '>$ {selectedPlan.price}</p>
      <hr />
      <ul className="list-disc mx-5 my-5">
        <li>{selectedPlan.month}-Month Subscription Plan</li>
        <li>Unlimited Job Postings</li>
        <li>Wide Talent Pool</li>
        <li>Priority Search Results</li>
        <li>Easy Job Management</li>
        <li>24/7 Customer Support</li>
      </ul>
      <button className="w-full text-white font-semibold bg-indigo-950 rounded-md p-3 hover:bg-indigo-700" onClick={()=>{handleClick()}}>Pay Now</button>
          </>
        }
         
    </div>
  )
}

export default Payment;
