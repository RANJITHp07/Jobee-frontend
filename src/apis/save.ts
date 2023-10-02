import Api from "@/services/api";
import saveRoutes from "@/services/endpoints/saveEndpoint";

const getHeaders = (token:string) => ({
   headers: {
       Authorization: token,
   },
});

export const savejobs=async(data:{id:string,jobId:string},token:string)=>{
   const res=await Api.post(saveRoutes.savejobs,data,getHeaders(token))
   return res
}

export const savedJobs=async(id:string,token:string)=>{
    const res=await Api.get(saveRoutes.savedJobs(id),getHeaders(token))
    
    return res
 }
