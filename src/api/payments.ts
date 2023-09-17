import axios from "axios"


const getHeaders = (token:string) => ({
    headers: {
        Authorization: token,
    },
});

export const getPlans=async ()=>{
    try{
        const res=await axios.get("http://www.jobeee.website/v1/api/plans")
        return res
    }catch(err){
        throw err
    }
} 

export const getUsepayment=async (userId:string,token:string)=>{
    try{
       
        const res=await axios.get(`http://www.jobeee.website/v1/api/plans/user/${userId}`,getHeaders(token))
        
        return res
    }catch(err){
        throw err
    }
}



export const payment=async (stripeCustomerId:string,token:string)=>{
    try{
        const res=await axios.get(`http://www.jobeee.website/v1/api/plans/subs/${stripeCustomerId}`,getHeaders(token))
        return res
    }catch(err){
        throw err
    }
}


 