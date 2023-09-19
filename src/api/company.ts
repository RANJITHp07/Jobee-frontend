import axios from "axios"

const getHeaders = (token:string) => ({
   headers: {
       Authorization: token,
   },
});

export const uploadlogo=async(file:FormData)=>{
    try{
        const res=await axios.post(`http://www.jobeee.website/v1/api/upload?category=''`,file)
        return res
    }catch(err){
        console.log(err)
        throw err
    }
}

export const  createCompany=async(company:any,token:string)=>{
     try{
        const res=await axios.post(`http://www.jobeee.website/v3/api/company`,company,getHeaders(token))
        return res
     }catch(err){
        throw err
     }
}

export const getJobs=async(id:string,token:string)=>{
    try{
        const res = await axios.get(`http://www.jobeee.website/v3/api/company/getjobs/${id}`,getHeaders(token));
        return res
     }catch(err){
        throw err
     }
}



export const getCompany=async(id:string)=>{
   try{
       const res = await axios.get(`http://www.jobeee.website/v3/api/company/${id}`);
       return res
    }catch(err){
       throw err
    }
}


export const updateCompany=async(id:string,update:any,token:string)=>{
    try{
        const res = await axios.put(`http://www.jobeee.website/v3/api/company/${id}`,update,getHeaders(token));
        return res
     }catch(err){
        throw err
     }
}

export const getReviews =async(id:string,token:string)=>{
     try{
       const res=await axios.get(`http://www.jobeee.website/v3/api/company/review/${id}`,getHeaders(token))
       return res
    }catch(err){
        throw err
     }
}

export const postReviews =async(id:string,username:string,review:string,rating:number,token:string)=>{
    try{
      const res=await axios.post(`http://www.jobeee.website/v3/api/company/review`,{ _id:id,username:username,review:review,rating:rating},getHeaders(token))
      return res
   }catch(err){
       throw err
    }
}

export const getAllcompanies=async()=>{
   try{
      const res=await axios.get("http://www.jobeee.website/v3/api/company/getAll/companies")
      return res
   }catch(err){
      throw err
   }
}

export const Searchcomapny=async(search:string)=>{
   try{
      const res=await axios.get(`http://www.jobeee.website/v3/api/company/search/companies`,{
         params:{
           search:search
         }
       })
       return res
   }catch(err){
      throw err
   }
}

export const getPhoto=async(imageName:string)=>{
   try{
      const res=await axios.get(`http://www.jobeee.website/v1/api/upload`,{
         params:{
           imageName
         }
       })
       return res
   }catch(err){
      throw err
   }
}