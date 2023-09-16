import axios from "axios";


const getHeaders = (token:string) => ({
  headers: {
      Authorization: token,
  },
});

export const sendMessage=async(id:string,userId:string,type:string,newMessage:string,token:string)=>{
    try{
        const res = await axios.post('http://www.jobee.website/v2/api/chat/message', {
            conversationId: id,
            sender: userId,
            text: {
              type: type,
              text: newMessage,
            },
          },getHeaders(token));
          return res
    }catch(err){
        throw err
    }
}

export const createConvo=async(recieveId:string,senderId:string,token:string)=>{
  try{
    const res=await axios.post("http://www.jobee.website/v2/api/chat/convo",{recieveId,senderId},getHeaders(token))
    return res
  }catch(err){
    throw err
  }
}

export const getConvo=async(userId:string,token:string)=>{
  try{
    const res=await axios.get(`http://www.jobee.website/v2/api/chat/convo/${userId}`,getHeaders(token));
    return res
  }catch(err){
    throw err
  }
}


export const uploadmedia=async(id:string,userId:string,text: {
  type: string;
  text: any;
},token:string)=>{
   try{
    const res = await axios.post('http://www.jobee.website/v2/api/chat/message', {
      conversationId: id,
      sender: userId,
      text:text
    },getHeaders(token));
    return res
   }catch(err){
    throw err
   }

}

export const chatMessage=async(id:string,token:string)=>{
  try{
    const res = await axios.get(`http://www.jobee.website/v2/api/chat/message/${id}`,getHeaders(token));
    return res
  }catch(err){
    throw err
  }
}

export const chatNotification=async(userId:string)=>{
  try{
    const res = await axios.post(`http://www.jobee.website/v2/api/chat/getallmessages`,{id:userId});
    return res
  }catch(err){
    throw err
  }
}

export const deleteAllNotification=async(userId:string)=>{
  try{
    const res = await axios.post(`http://www.jobee.website/v2/api/chat/deleteallmessages`,{id:userId});
    return res
  }catch(err){
    throw err
  }
}

export const deletedingleNotification=async(userId:string,index:number)=>{
  try{
    const res = await axios.post(`http://www.jobee.website/v2/api/chat/deleteallmessagesatindex`,{id:userId,index:index});
    return res
  }catch(err){
    throw err
  }
}