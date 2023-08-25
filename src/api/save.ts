import axios from "axios"

const getHeaders = (token:string) => ({
   headers: {
       Authorization: token,
   },
});

export const savejobs=async(data:{id:string,jobId:string},token:string)=>{
   const res=await axios.post("http://localhost:5000/v6/api/job/save",data,getHeaders(token))
   return res
}

export const savedJobs=async(id:string,token:string)=>{
    const res=await axios.get(`http://localhost:5000/v6/api/job/save/${id}`,getHeaders(token))
    
    return res
 }
