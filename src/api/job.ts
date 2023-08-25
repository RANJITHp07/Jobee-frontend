import axios from 'axios'


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
        const res=await axios.get("http://localhost:5000/v6/api/job/search/filter", {params: {
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
        const res =await axios.post("http://localhost:5000/v6/api/job",jobData)
        return res
    }catch(err){
        console.log(err)
    }
}

export const getLocations=async()=>{
    try{
        const res=await axios.get("http://localhost:5000/v6/api/job/location/parts");
        return res

    }catch(err){
        throw err
    }
}

export const getRoles=async()=>{
    try{
        const res=await axios.get("http://localhost:5000/v6/api/job/roles/parts");
        return res

    }catch(err){
        throw err
    }
}

export const getUser=async (id:string)=>{
    try{
        const res=await axios.get(`http://localhost:5000/v6/api/job/${id}`)
        return res
    }catch(err){
        console.log(err)
    }
}


export const getJobs=async(userId:string)=>{
    try{
        const res=await axios.get(`http://localhost:5000/v6/api/job/jobs/company/${userId}`)
        return res
    }catch(err){
        console.log(err)
    }
}


export const companyFilter=async(location:string[],rating:string[],companyType:string[])=>{
    try{
        const res=await axios.get("http://localhost:5000/v6/api/job/companies/filter",{
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
        const res=await axios.delete(`http://localhost:5000/v6/api/job/${JobId}`)
        return res
    }catch(err){
        console.log(err)
    }
}

export const searchJob=async(param:string)=>{
    try{
        const res=await axios.post("http://localhost:5000/v6/api/job/search",{search:param})
        return res
    }catch(err){
        throw err
    }
}




export const jobApply=async(id:string,userId:string,token:string)=>{
    try{
        const res=await axios.post("http://localhost:8081/v4/api/profile/jobapplied",{_id:id,userId:userId},{
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
    const res = await axios.post('http://localhost:5000/v6/api/job/findsimilar', { role: role, location: location,skills:skills });
    return res
   }catch(err){
    throw err
   }
}


export const userExist=async(id:string,userId:string,token:string)=>{
    try{
        
        const res=await axios.get(`http://localhost:8081/v4/api/profile/userExist/${id}`,{
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
        const res=await axios.get(`http://localhost:5000/v6/api/job/jobs/company/${id}`)
        return res
    }catch(err){
        throw err
    }
}

export const updateApplication=async(param:string,jobData:any)=>{
    try{
        const res=await axios.put("http://localhost:5000/v6/api/job",{id:param,update:jobData})
        return res
    }catch(err){
        throw err
    }
}

export const getJobapplication=async(param:string)=>{
    try{
        const res=await axios.get(`http://localhost:5000/v6/api/job/${param}`)
        return res
    }catch(err){
        throw err
    }
}

export const jobCompanies=async()=>{
    try{
        
        const res=await  axios.get("http://localhost:5000/v6/api/job/get/companies")
        return res
    }catch(err){
        throw err
    }
}

export const Jobroleserach=async(role:string,location:string)=>{
   try{
    const res=await  axios.get("http://localhost:5000/v6/api/job/role/search",{params: {
        role:role,
        location:location
    }})
    return res
   }catch(err){
    throw err
   }
}
