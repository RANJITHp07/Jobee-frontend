import Api from "@/services/api";
import authRoutes from "@/services/endpoints/authEndpoint";

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
        const res=await Api.post(authRoutes.signin, userData);
        return res
      }catch(err){
        console.log(err)
      }
}

export const Adminsignin=async (userData:FormValues)=>{
  try{
    const res=await Api.post(authRoutes.Adminsignin, userData);
    return res
  }catch(err){
    console.log(err)
  }
}

export const login=async (userData:FormValues)=>{
    try{
      const res=await Api.post(authRoutes.login,userData);
      return res
    }catch(err){
      console.log(err)
    }
}


export const Adminlogin=async (userData:FormValues)=>{
  try{
    const res=await Api.post(authRoutes.Adminlogin,{email:userData.email,password:userData.password});
    return res
  }catch(err){
    console.log(err)
  }
}

export const getAdmin=async(adminId:string)=>{
    try{
      const res=await Api.get(authRoutes.getAdmin(adminId));
      return res
    }catch(err){
      throw err
    }
}

export const UpdatePassword=async (userData:FormValues)=>{
    try{
       
        const res=await Api.patch(authRoutes.UpdatePassword,{
          userData
        });
        return res
      }catch(err){
        console.log(err)
      }
}

export const sendEmail=async(email:string,username:string)=>{
    try{
         const res=await Api.post(authRoutes.sendEmail,{email,username})
         
         return res
    }catch(err){
        console.log(err)
        throw err
      }
}


export const AdminsendEmail=async(email:string,username:string)=>{
  try{
       const res=await Api.post(authRoutes.AdminsendEmail,{email,username})
       console.log(res.data);
       return res
  }catch(err){
      console.log(err)
      throw err
    }
}

export const emailVerification=async(email:string,otp:string)=>{
  try{
    const res=await Api.post(authRoutes.emailVerification,{email,otp})
    
    return res
}catch(err){
   console.log(err)
   throw err
 }
}

export const getUser=async(id:string,token:string)=>{
     try{
        const res=Api.get(authRoutes.getUser(id),getHeaders(token))
        return res
     }catch(err){
      throw err
     }
}

export const getrole=async(role:string,token:string)=>{
  try{
    const res=await Api.get(authRoutes.getrole(role),{
      params:{
      role:role
    },...getHeaders(token)})
    return res
  }catch(err){throw err}
}

export const getEmail=async(email:string,token:string)=>{
  try{
    const res=await Api.get(authRoutes.getEmail(email),{params:{
      email:email
    },...getHeaders(token)
  })
    return res
  }catch(err){throw err}
}


export const updateAuth=async(email:string,update:any,token:string)=>{
  try{
    const res=await Api.put(authRoutes.updateAuth(email),update,getHeaders(token))
  }catch(err){throw err}
}

