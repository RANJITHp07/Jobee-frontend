import Api from "@/services/api";
import jobRoutes from "@/services/endpoints/jobEndpoint";


interface JobData{
    company: string;
    role: string | undefined;
    desc: string | undefined;
    experience:number[],
    salary:number[],
    education: string | undefined;
    workmode: string | undefined;
    location: string;
}
  

export const filter=async (selectedWorkModes:string[],selectedsalary:number[][],selectedcompany:string[],sliderRange:[number,number],rating:number[],location:string[])=>{
     console.log(jobRoutes.companyFilter)   
    const res=await Api.get(jobRoutes.filter, {params: {
            workmode: selectedWorkModes,
            salary: selectedsalary,
            companyType: selectedcompany,
            experience: sliderRange,
            rating:rating,
            location:location
          }})

          return res
}

export const jobForm=async(jobData:JobData)=>{
    try{
        const res =await Api.post(jobRoutes.jobForm,jobData)
        return res
    }catch(err){
        console.log(err)
    }
}

export const getLocations=async()=>{
    try{
        const res=await Api.get(jobRoutes.getLocations);
        return res

    }catch(err){
        throw err
    }
}

export const getRoles=async()=>{
    try{
        const res=await Api.get(jobRoutes.getRoles);
        return res

    }catch(err){
        throw err
    }
}

export const getUser=async (id:string)=>{
    try{
        const res=await Api.get(jobRoutes.getUser(id))
        return res
    }catch(err){
        console.log(err)
    }
}


export const getJobs=async(userId:string)=>{
    try{
        const res=await Api.get(jobRoutes.getJobs(userId));
        return res
    }catch(err){
        console.log(err)
    }
}


export const companyFilter=async(location:string[],rating:string[],companyType:string[])=>{
    try{
        const res=await Api.get(jobRoutes.companyFilter,{
            params:{
                companyType,
                location,
                rating
            }
        })
      
        return res
    }catch(err){
        throw err
    }
}

export const deleteJob=async(JobId:string)=>{
    try{
        const res=await Api.delete(jobRoutes.deleteJob(JobId));
        return res
    }catch(err){
        console.log(err)
    }
}

export const searchJob=async(param:string)=>{
    try{
        const res=await Api.post(jobRoutes.searchJob,{search:param})
        return res
    }catch(err){
        throw err
    }
}




export const jobApply=async(id:string,userId:string,token:string)=>{
    try{
        const res=await Api.post(jobRoutes.jobApply,{_id:id,userId:userId},{
            headers: {
                Authorization: token,
            },
         })
        return res
    }catch(err){
        throw err
    }
}

export const findSimilarJobs=async(role:string,location:string,skills:string[])=>{
   try{
    const res = await Api.post(jobRoutes.findSimilarJobs, { role: role, location: location,skills:skills });
    return res
   }catch(err){
    throw err
   }
}


export const userExist=async(id:string,userId:string,token:string)=>{
    try{
        
        const res=await Api.get(jobRoutes.userExist(id),{
            params:{
                userId:userId
            },...{
                headers: {
                    Authorization: token,
                },
             }
        })
        return res
    }catch(err){
        throw err
    }
}

export const getcompanyJob=async(id:string)=>{
    try{
        const res=await Api.get(jobRoutes.getcompanyJob(id))
        return res
    }catch(err){
        throw err
    }
}

export const updateApplication=async(param:string,jobData:any)=>{
    try{
        const res=await Api.put(jobRoutes.updateApplication,{id:param,update:jobData})
        return res
    }catch(err){
        throw err
    }
}

export const getJobapplication=async(param:string)=>{
    try{
        const res=await Api.get(jobRoutes.getJobapplication(param))
        return res
    }catch(err){
        throw err
    }
}

export const jobCompanies=async()=>{
    try{
        
        const res=await  Api.get(jobRoutes.jobCompanies)
        return res
    }catch(err){
        throw err
    }
}

export const Jobroleserach=async(role:string,location:string)=>{
   try{
    const res=await  Api.get(jobRoutes.Jobroleserach,{params: {
        role:role,
        location:location
    }})
    return res
   }catch(err){
    throw err
   }
}



export const mutualskills=async(id:string,skills:string[])=>{
    try{
     const res=await  Api.post(jobRoutes.mutualskills,{id,skills})
     return res
    }catch(err){
     throw err
    }
 }


 export const savedorNot=async(userId:string,id:string)=>{
    try{
        const res=await  Api.get(jobRoutes.savedorNot,{
            params:{
                userId:userId,
                id:id
            }
        }
        )
        return res
       }catch(err){
        throw err
       }
 }




 export const stopRecruiting=async(id:string)=>{
    try{
        const res=await  Api.post(jobRoutes.stopRecruiting(id) )
        return res
       }catch(err){
        throw err
       }
 }


