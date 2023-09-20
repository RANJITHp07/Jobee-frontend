'use client'
import React, { useEffect, useRef,useState} from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Navbar from '@/app/components/navbar';
import { useAppSelector } from '@/redux/store';


function Page({ params }: { params: { id: string } }) {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const elementRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (elementRef.current) {
      const appID = 826092704;
      const serverSecret = 'dcc0763502d19fbed1b29e2e625282ed';
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

      <div ref={elementRef} className='grid placecontent-center h-screen' ></div>
    </div>
  );
}

export default Page;
