'use client'
import { useRef, useState, FormEventHandler, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import {auth,signInnWithGooogle} from "../config/firebase"
import { login, signin,sendEmail, emailVerification } from '../../api/auth';
import { createProfile } from '@/api/user';

interface FormValues {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role?: string | undefined; 
  confirm_password?: string;
}

interface UseFormProps {
  page: boolean;
}

const useForm = ({ page }: UseFormProps) => {
  
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const role = useRef<HTMLSelectElement>(null);
  const confirm_password = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp,setotp]=useState({
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',
    otp5:'',
    otp6:'',
  })

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const router = useRouter();


  let google:any=null
 // to signin using google
  const signInnWithgoogle=async ()=>{
       try{
        if(!google){
          google= await signInnWithGooogle()
          const data:any={
            ...google,
              role:role.current?.value
        }
            const res=await signin(data)
            if(res?.data==="Saved sucessfully"){
              const res=await login(google)
            const userId=res?.data.session.user
            if(res?.data.user.message==="Logged In succesfully"){
              localStorage.setItem("token",JSON.stringify(res.data))
               if(res?.data.user.role==="recruiter"){
                router.push("/company");
               }else{
                await createProfile(userId,res.data.user.token)
                router.push("/");
                setLoading(false)
               }
            }
            }else{
              message.info(res?.data)
            }
        } 
        
       }catch (err) {
      console.log(err);
    }
  }


  // to signin using google authentication
  const signinwithLogin=async ()=>{
    try{
        !google ? google= await signInnWithGooogle() :google=google // we get details from the firebase
        console.log(google)
            const res=await login(google)
            const userId=res?.data.session.user
            if(res?.data.user.message==="Logged In succesfully"){
              localStorage.setItem("token",JSON.stringify(res.data))
               if(res?.data.user.role==="recruiter"){
                router.push("/company");
                setLoading(false) 
               }else{
                await createProfile(userId,res.data.user.token)
                router.push("/");
                setLoading(false)
               }
            }
       }catch (err) {
      console.log(err);
    }
  }
 
  // this will redirect to the otp entering page on entering the details of the user
  const handleClick = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
       e.preventDefault()
      if( password.current && password.current.value.length<8){
        password.current.setCustomValidity("Password must be at least 8 words")
        return 
      }
        if (password.current?.value === confirm_password.current?.value && email.current && username.current) {
          setLoading(true)
          const res=await sendEmail(email?.current.value,username.current.value);
          
          if(res.data=="Email sent"){
            message.success(res.data)
            setLoading(true);
            setIsModalOpen(true);
          }
          
         
        } else {
          confirm_password.current && confirm_password.current.setCustomValidity("Password not matching")
          setLoading(false);
        }
      }
    catch (err) {
      
      message.error("Error in the input field")
      console.log(err);
      setLoading(false);
    }
    
   
  };

  // helps to login with email and password and redirects to the homepage
  const handleLogin=async (e:React.FormEvent<HTMLFormElement>)=>{
    try{
      e.preventDefault()
        setLoading(true);
        const newUser={
          email:email.current?.value,
          password:password.current?.value
        }
        const res= await login(newUser)
        const userId=res?.data.session.user
        if(res?.data.user.message==="Logged In succesfully"){
          localStorage.setItem("token",JSON.stringify(res.data))
           if(res?.data.user.role==="recruiter"){
            router.push("/company");
            
           }else{
            await createProfile(userId,res.data.user.token)
            router.push("/");
           }
        }
        else{
           message.error("enter correct email or password")
           setLoading(false)
        }
    }
    catch (err) {
      console.log(err);
      message.error("Wrong Email Or Password")
      setLoading(false);
    }
}

//to handle the forgetpassword if the user forgets and the user gets an otp and 
//if it is verified then the user can change the password
const handleforgetPssword=async( e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
 
    try{
      if( email.current && email.current.value){
        
        const res=await sendEmail(email?.current.value,'User');
        if(res.data=="Email sent"){
          message.success(res.data)
          setLoading(false);
          setIsModalOpen(true);

        }
      }
      else{
        email.current && email.current.setCustomValidity("Enter the email")
        message.info("Enter the email")
      }
      
    }catch(err){
      email.current && email.current.setCustomValidity("Enter the email")
      console.log(err)
      
      
    }
}
 
// to verify the otp and redirect to the home page if the user exist or else redirect to the signin page
const handleOk = async() => {
    const OTP=otp.otp1+otp.otp2+otp.otp3+otp.otp4+otp.otp5+otp.otp6
    if(username.current){
   if(email.current){
    const res=await emailVerification(email.current?.value,OTP)
    
   if(res.data==='Successfully logged in'){
    let r
    role.current?.value==="JobSeeker"? r="recruiter":r="employer"
    const user: FormValues = {
      username: username.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      role: r,
    };
    const p= await signin(user)
    if(p?.data==="Saved sucessfully"){
      message.info(p?.data)
      setLoading(false);
      router.push('/login');
    }else{
      message.error(p?.data)
    }
   }else{
    message.error("Wrong OTP")
    setLoading(false);
   }
  }
  
}
else{
  if(email.current){
    const OTP=otp.otp1+otp.otp2+otp.otp3+otp.otp4+otp.otp5+otp.otp6
    const res=await emailVerification(email.current.value,OTP)
    if(res.data==='Successfully logged in'){
      router.push("/forgetpassword")
    }
  }
}
setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
  setLoading(false)
};

  return {
    username,
    password,
    email,
    role,
    confirm_password,
    loading,
    handleClick,
    signInnWithgoogle,
    signinwithLogin,
    handleLogin,
    isModalOpen,
    otp,
    setotp,
    handleCancel,
    handleOk,
    handleforgetPssword,
    otpRefs
  };
};

export default useForm;