import Api from "@/services/api";
import chatRoutes from "../services/endpoints/chatEndpoint";


const getHeaders = (token:string) => ({
  headers: {
      Authorization: token,
  },
});

export const sendMessage=async(id:string,userId:string,type:string,newMessage:string,token:string)=>{
    try{
        const res = await Api.post(chatRoutes.sendMessage, {
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
    const res=await Api.post(chatRoutes.createConvo,{recieveId,senderId},getHeaders(token))
    return res
  }catch(err){
    throw err
  }
}

export const getConvo=async(userId:string,token:string)=>{
  try{
    const res=await Api.get(chatRoutes.getConvo(userId),getHeaders(token));
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
    const res = await Api.post(chatRoutes.uploadMedia, {
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
    const res = await Api.get(chatRoutes.chatMessage(id),getHeaders(token));
    return res
  }catch(err){
    throw err
  }
}

export const chatNotification=async(userId:string)=>{
  try{
    const res = await Api.post(chatRoutes.chatNotification,{id:userId});
    return res
  }catch(err){
    throw err
  }
}

export const deleteAllNotification=async(userId:string)=>{
  try{
    const res = await Api.post(chatRoutes.deleteAllNotification,{id:userId});
    return res
  }catch(err){
    throw err
  }
}

export const deletedingleNotification=async(userId:string,index:number)=>{
  try{
    const res = await Api.post(chatRoutes.deleteSingleNotification,{id:userId,index:index});
    return res
  }catch(err){
    throw err
  }
}