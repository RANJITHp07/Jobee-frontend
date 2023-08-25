'use client'
import React, { useEffect, useRef,useState} from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Navbar from '@/app/components/navbar';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';

function Page({ params }: { params: { id: string } }) {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const[user,setuser]=useState<any>()
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    const fetchdata=async()=>{
        try{
          if(userId){
            const res=await axios.get(`http://localhost:4000/api/user/${userId}`)
            console.log(res.data)
            setuser(res.data)
          }
          
        }catch(err){
          throw err
        }
    }
    fetchdata()
  },[userId])

  useEffect(() => {
    if (elementRef.current) {
      const appID = 797504077;
      const serverSecret = '34f12bc529f6cf5390e05eaa31d0f66e';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        params.id,
        Date.now().toString(),
        "Unknown"
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp && zp.joinRoom({
        container: elementRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        showTurnOffRemoteCameraButton: true,
        showTurnOffRemoteMicrophoneButton: true,
        showRemoveUserButton: true,
      });
    }
  }, [params.id,userId]);

  return (
    <div>
       <div className="hidden"><Navbar page={true}/></div>
      <div ref={elementRef} ></div>
    </div>
  );
}

export default Page;
