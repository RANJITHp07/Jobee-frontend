'use client'
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import Users from '../components/users';
import { useRouter } from 'next/navigation';
import SendIcon from '@mui/icons-material/Send';
import { io, Socket } from 'socket.io-client';
import Navbar from '../components/navbar';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useAppSelector } from '@/redux/store';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Modal } from 'antd';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { upload } from '@/api/user';
import { chatMessage, sendMessage, uploadmedia } from '@/api/chat';


function Page() {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const token:string=useAppSelector((state)=>state.authReducer.value.token)
  const [typing, setTyping] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [roomId, setRoomId] = useState();
  const [id, setId] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [receiverId, setReceiverId] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef<Socket | null>();
  const [message, setMessage] = useState<any>([]);
  const [image, setImage] = useState('');
  const scrollRef = useRef<any>();
  const [modal, openModal] = useState<boolean>(false);
  const router = useRouter();
  const [showEmojii,setshowemojii]=useState(false)
  const [online,getonline]=useState([])
  const [username,setusername]=useState('')
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const addEmoji = (e:any) => {
    const sym = e.unified.split("_");
    const codeArray:any = [];
    sym.forEach((el:any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setNewMessage((prev)=>prev+emoji)
  };

  const generateRandomNumber = (min: number, max: number) => {
    const randomValue = Math.random() * (max - min) + min;
    const roundedRandomNumber = Math.floor(randomValue) * 1000;
    return roundedRandomNumber;
  };

  const [typingTimeout, settypingTimeout] = useState<any>(null);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    if (socket.current) {
      setNewMessage(e.target.value);
      socket.current.emit('typing-started', { senderId: userId, receiverId: receiverId });

      if (typingTimeout) clearTimeout(typingTimeout);

      settypingTimeout(
        setTimeout(() => {
          socket.current && socket.current.emit('typing-stoped', { senderId: userId, receiverId: receiverId });
        }, 1000)
      );
    }
  }

  const handleSendmessage = async () => {
    try {
      if (newMessage.trim() !== '' && socket.current && id) {
        const u=online.some((p:any)=>p.userId===receiverId);
        if(!u){
            console.log(newMessage)   
        }

        socket.current.emit('sendMessage', { senderId: userId, receiverId: receiverId, text: newMessage });
        const res = await sendMessage(id,userId,'chat',newMessage,token)
        console.log(res);
        setNewMessage('');
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      throw err;
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && socket.current) {
        const uploadedFile = e.target.files[0];
        const fileExtension = uploadedFile.name.split('.').pop(); 
        let text
        
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const response = await upload('chat', formData,token);
        console.log(response.data);
        if(fileExtension==='pdf'){
          text={
            type:'pdf',
            text:response.data
          }
      } else{
        text={
          type:'image',
          text:response.data
        }
      }
        id && await uploadmedia(id,userId,text,token)
        setImage(response.data);
        socket.current.emit('sendMessage', { senderId: userId, receiverId: receiverId, text: response.data });
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    socket.current = io('ws://www.jobeee.website');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && setNewMessage(arrivalMessage.text);
  }, [arrivalMessage]);

  useEffect(() => {
    if (userId && socket.current) {
      socket.current.on('typing-started-from-server', () => setTyping(true));
      socket.current.on('typing-stoped-from-server', () => setTyping(false));
    }
  }, [userId, socket]);

  useEffect(() => {
    if (userId && socket.current) {
      socket.current.emit('addUser', userId);
      socket.current.on('getUsers', (users) => {
        getonline(users)
        console.log(users)
      });
    }
  }, [userId, socket.current]);

  const handleVediocall = async () => {
    try {
      const newRandomNumber = generateRandomNumber(1, 100);
      setRandomNumber(newRandomNumber);
      socket.current && socket.current.emit('vedio-calling', { senderId: userId, receiverId: receiverId, text: newRandomNumber });
      router.push(`/vediocall/${newRandomNumber}`);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    if (userId && socket.current) {
      socket.current.on('vedio-answer', (data) => {
        openModal(true);
        setRoomId(data.text);
      });
    }
  }, [userId, socket]);

  const handleOk = () => {
    try {
      router.push(`/vediocall/${roomId}`);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id && token) {
        const res = await chatMessage(id,token)
        console.log(res.data);
        setMessage(res.data);
      }
    }
    fetchData();
  }, [id, newMessage, image,token]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div>
      <div className="hidden">
        <Navbar page={false} />
      </div>
      <div className="bg-indigo-950 p-5 w-screen hidden lg:block">
        <p className="text-white font-extrabold text-2xl">Jobee</p>
      </div>
      <div className='bg-indigo-950 p-3 lg:hidden '>
              <p className='text-white '>{username}</p>
              {id && <p className='text-white text-xs online'>{id in online ? "Online" : "Offline"}</p>}
            </div>
      {showFilter && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex bg-black bg-opacity-50 z-50">
          <Users setShowFilter={setShowFilter} userId={userId} setid={setId} setrecieverId={setReceiverId} setusername={setusername}/>
        </div>
      )}
      <div className="lg:flex bg-[url('/wallpaper.jpg')] w-screen">
        <div className="hidden lg:block lg:w-1/4">
          <Users setShowFilter={setShowFilter} userId={userId} setid={setId} setrecieverId={setReceiverId}  setusername={setusername}/>
        </div>
        <button
          className="z-0 relative bg-indigo-950 text-white font-bold px-2 py-1 m-2 rounded-xl lg:hidden"
          onClick={() => setShowFilter(true)}
        >
          Users
        </button>
        <div className="w-screen">
        
       
          <div className="message-container relative overflow-scroll-y m-3">
            
            {message.map((p: any, index: number) => (
              <div
                key={index}
                className={`message ${
                  p.sender === userId ? 'justify-end' : 'justify-start w-1/2'
                }`}
              >
                {p.text.type === 'chat' ? (
                  <div className={p.sender === userId ? 'flex justify-end' : 'flex justify-start w-1/2'}>
                    
                  <div className="bg-indigo-950 text-white text-sm rounded-lg p-3 my-5 ">
                    <p className=" text-white text-sm rounded-lg inline p-3">{p.text.text}</p>
                  
                  </div>
                  </div>
                  
                ) : (  p.text.type ==='image'? 
                  <div className={p.sender === userId ? 'flex justify-end' : 'flex justify-start w-1/2'}>
                    <a href={`http://localhost:5443/chat/${p.text.text}`} target="_blank" rel="noopener noreferrer" >
                    <Image
                      src={`http://localhost:5443/chat/${p.text.text}`}
                      width={200}
                      height={100}
                      alt=""
                      className='m-3'
                    />
                    </a>
                  </div> :
                  <>
                     <div className={p.sender === userId ? 'flex justify-end my-3' : 'flex justify-start w-1/2 my-3'}>
                     
                     <a href={`http://localhost:5443/chat/${p.text.text}`} target="_blank" rel="noopener noreferrer" className='inline border-2'>
                     <Image src={"/pdf.png"} width={200} height={70} alt=''/>
                     <p className=''>{p.text.text}</p>
                     </a>
                  
                   </div>
                   
                   </>
                
                )}
              </div>
            ))}
            {typing && (
              <p className="bg-indigo-950 inline text-white text-sm rounded-lg p-3 my-5">
                Typing...
              </p>
            )}
          </div>
         
          <div className=" position absolute bottom-0  rounded-full box_shadow p-3 w-11/12 lg:w-8/12 ml-3 md:ml-7 lg:ml-20 bg-white">
         {
           showEmojii && 
           <div className=" absolute bottom-16">
            <Picker data={data} onEmojiSelect={addEmoji} emojiSize={20} emojiButtonSize={28} />
            </div>
         }
          
            <div className="flex">
            <p className="mr-3 cursor-pointer" onClick={()=>setshowemojii(!showEmojii)}><SentimentSatisfiedAltIcon/></p>
              <div className="w-full ">
                <input
                  type="text"
                  placeholder="Send message"
                  className="focus:outline-none w-full"
                  value={newMessage}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInput(e);
                  }}
                />
              </div>
              <div className="flex justify-end">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                />
                <label htmlFor="file" className="cursor-pointer  right-0">
                  <AttachFileIcon className="-rotate-45 mx-3" id="file" />
                </label>
                <VideoCameraBackIcon
                  className="text-indigo-950 text-2xl mr-2 cursor-pointer"
                  onClick={() => handleVediocall()}
                />
                <button
                  className=""
                  onClick={() => {
                    handleSendmessage();
                  }}
                >
                  <SendIcon className="text-indigo-950 text-2xl" />
                </button>
              </div>
            </div>
          </div>
          <div ref={scrollRef} />
        </div>
      </div>
    </div>
  );
}

export default Page;
