
import axios from "axios"


const getHeaders = (token:string) => ({
    headers: {
        Authorization: token,
    },
});

export const createProfile=async(userId:string,token:string)=>{
    try{
       const res= await axios.post('https://www.jobeee.website/v4/api/profile',{userId:userId},getHeaders(token))
       return res
    }catch(err){
        console.log(err)
    }
}

export const  getProfile=async(userId:string,token:string)=>{

    try{
        const res = await axios.get(`https://www.jobeee.website/v4/api/profile/${userId}`,getHeaders(token));
        return res
     }catch(err){
         console.log(err)
     }
}

export const statusJob=async(id:string,token:string)=>{
    try{
        
        const res=await axios.get(`https://www.jobeee.website/v4/api/profile/getusers/${id}`,getHeaders(token))
        return res
    }catch(err){
        throw err
    }
}

export const updateprofile=async(userId:string,update:any,token:string)=>{

    try{
        const res = await axios.put(`https://www.jobeee.website/v4/api/profile/${userId}`,update,getHeaders(token));
        return res
     }catch(err){
         console.log(err)
     }
}

export const upload=async(category:string,file:FormData,token:string)=>{
    try{
        const res=await axios.post(`https://www.jobeee.website/v1/api/upload?category=${category}`,file)
        return res
    }catch(err){
        console.log(err)
        throw err
    }
}

export const updateProfilephoto=async(id:string,file:string,category:string,token:string)=>{
       try{
             const res=await axios.put(`https://www.jobeee.website/v4/api/profile/upload/${id}?category=${category}`,{file:file},getHeaders(token))
           
             return res
       }catch(err){
         console.log(err)
         throw(err)
       }
}

export const getShortlist=async(id:string,token:string)=>{
    try{
        const res=await axios.get(`https://www.jobeee.website/v4/api/profile/shortlist/${id}`,getHeaders(token))
        return res
    }catch(err){
        throw err
    }
}

export const unShortlist=async(id:string,token:string)=>{
    try{
        const res=await axios.get(`https://www.jobeee.website/v4/api/profile/unshortlist/${id}`,getHeaders(token))
        return res
    }catch(err){
        throw err
    }
}


export const statusShortlist=async(id:string,status:string[],token:string)=>{
    try{
        const res=await axios.get(`https://www.jobeee.website/v4/api/profile/filter/${id}`,{params:{
            status:status
         },...getHeaders(token)})
         return res
    }catch(err){
        throw err
    }
}

export const shortlistusers=async(id:string,userId:string[],token:string)=>{
   try{
    const res=await axios.put("https://www.jobeee.website/v4/api/profile/user/shortlist",{id,userId},getHeaders(token))
    return res
   }catch(err){
    throw err
   }
}


export const unshortlistusers=async(id:string,userId:string,token:string)=>{
    try{
     const res=await axios.put("https://www.jobeee.website/v4/api/profile/user/unshortlist",{id,userId},getHeaders(token))
     return res
    }catch(err){
     throw err
    }
 }

export const getView=async(id:string,userId:string,token:string)=>{
   const res= await axios.put("https://www.jobeee.website/v4/api/profile/status/jobapplied",{id,userId,status:"view"},getHeaders(token))
  
}

export const getapplicant=async(id:string,token:string)=>{
    try{
        const res=await axios.get(`https://www.jobeee.website/v4/api/profile/jobapplied/${id}`,getHeaders(token))
        return res
    }catch(err){
        
}
}

export const updateStatus=async(id:string,userId:string,status:string,token:string)=>{
    try{
        const res=await axios.put("https://www.jobeee.website/v4/api/profile/status/jobapplied",{id,userId,status},getHeaders(token))
    }catch(err){
        throw err
    }
}


export const jobcount=async(id:string)=>{
    try{
           const res=await axios.get(`https://www.jobeee.website/v4/api/profile/countjobapplication/${id}`)
           return res
    }catch(err){
        throw err
    }
}
