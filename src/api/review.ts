import axios from "axios"


const getHeaders = (token:string) => ({
    headers: {
        Authorization: token,
    },
});

export const deletereview=async(id:string,index:number,token:string)=>{
   try{
    const res=await axios.put(`http://www.jobeee.website/v3/api/company/review/delete/${id}`,{id:id,index},getHeaders(token))
    return res
   }catch(err){
    throw err
   }
}

export const savecomment=async(id:string,index:number,comment:string,rating:number,token:string)=>{
    try{
        const res= await axios.put("http://www.jobeee.website/v3/api/company/update/review",{id:id,index:index,comment:comment,rating},getHeaders(token))
        console.log(res.data)
        return res
    }catch(err){
        throw err
    }
}