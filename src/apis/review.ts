import Api from "@/services/api";
import reviewRoutes from "@/services/endpoints/reviewEndpoints";


const getHeaders = (token:string) => ({
    headers: {
        Authorization: token,
    },
});

export const deletereview=async(id:string,index:number,token:string)=>{
   try{
    const res=await Api.put(reviewRoutes.deleteReview(id),{id:id,index},getHeaders(token))
    return res
   }catch(err){
    throw err
   }
}

export const savecomment=async(id:string,index:number,comment:string,rating:number,token:string)=>{
    try{
        const res= await Api.put(reviewRoutes.updateReview,{id:id,index:index,comment:comment,rating},getHeaders(token))
        return res
    }catch(err){
        throw err
    }
}