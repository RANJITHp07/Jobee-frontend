import { useRef, useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { UpdatePassword } from '@/api/auth';

const useOtpVerification = () => {
  const router=useRouter()
  const email=useRef<HTMLInputElement>(null) 
  const password=useRef<HTMLInputElement>(null)
  const confirm_password=useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp,setotp]=useState({
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',
    otp5:'',
    otp6:'',
  })


  const updatePassword=async ()=>{
      try{
         
         if(password.current?.value===confirm_password.current?.value){
          
          const user={
            email:email.current?.value,
              password:password.current?.value
            
            
          }
          const res=await UpdatePassword(user)
          if(res?.data==='Updated Password'){
            message.info(res?.data);
            router.push("/login")
          }else{
            message.info("Some error occured")
          }
         }
      }catch (err) {
      console.log(err);
    }
  }

  return {
    email,
    updatePassword,
    password,
    confirm_password,
    
  };
};

export default useOtpVerification;
