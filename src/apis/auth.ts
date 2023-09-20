import axios from "axios"

interface FormValues {
    username?: string | undefined;
    email?: string | undefined;
    password: string | undefined;
    role?: string | undefined; 
    confirm_password?: string;
  }


  const getHeaders = (token:string) => ({
    headers: {
        Authorization: token,
    },
});
  
export const signin=async (userData:FormValues)=>{
      try{
        const res=await axios.post('https://www.jobeee.website/v4/api/auth/signin', userData);
        return res
      }catch(err){
        console.log(err)
      }
}

export const Adminsignin=async (userData:FormValues)=>{
  try{
    const res=await axios.post('https://www.jobeee.website/v4/api/auth/admin/signin', userData);
    return res
  }catch(err){
    console.log(err)
  }
}

export const login=async (userData:FormValues)=>{
    try{
      const res=await axios.post("https://www.jobeee.website/v4/api/auth/login",userData);
      return res
    }catch(err){
      console.log(err)
    }
}


export const Adminlogin=async (userData:FormValues)=>{
  try{
    const res=await axios.post("https://www.jobeee.website/v4/api/auth/admin/login",{email:userData.email,password:userData.password});
    return res
  }catch(err){
    console.log(err)
  }
}

export const getAdmin=async(adminId:string)=>{
    try{
      const res=await axios.get(`https://www.jobeee.website/v4/api/auth/admin/${adminId}`)
      return res
    }catch(err){
      throw err
    }
}

export const UpdatePassword=async (userData:FormValues)=>{
    try{
       
        const res=await axios.patch("https://www.jobeee.website/v4/api/auth",{
          userData
        });
        return res
      }catch(err){
        console.log(err)
      }
}

export const sendEmail=async(email:string,username:string)=>{
    try{
         const res=await axios.post("https://www.jobeee.website/v4/api/auth/verify",{email,username})
         
         return res
    }catch(err){
        console.log(err)
        throw err
      }
}


export const AdminsendEmail=async(email:string,username:string)=>{
  try{
       const res=await axios.post("https://www.jobeee.website/v4/api/auth/admin/verify",{email,username})
       console.log(res.data);
       return res
  }catch(err){
      console.log(err)
      throw err
    }
}

export const emailVerification=async(email:string,otp:string)=>{
  try{
    const res=await axios.post("https://www.jobeee.website/v4/api/auth/otp",{email,otp})
    console.log(res.data);
    return res
}catch(err){
   console.log(err)
   throw err
 }
}

export const getUser=async(id:string,token:string)=>{
     try{
        const res=axios.get(`https://www.jobeee.website/v4/api/auth?id=${id}`,getHeaders(token))
        return res
     }catch(err){
      throw err
     }
}

export const getrole=async(role:string,token:string)=>{
  try{
    const res=await axios.get("https://www.jobeee.website/v4/api/auth",{
      params:{
      role:role
    },...getHeaders(token)})
    return res
  }catch(err){throw err}
}

export const getEmail=async(email:string,token:string)=>{
  try{
    const res=await axios.get("https://www.jobeee.website/v4/api/auth",{params:{
      email:email
    },...getHeaders(token)
  })
    return res
  }catch(err){throw err}
}


export const updateAuth=async(email:string,update:any,token:string)=>{
  try{
    const res=await axios.put(`https://www.jobeee.website/v4/api/auth/update/${email}`,update,getHeaders(token))
  }catch(err){throw err}
}

