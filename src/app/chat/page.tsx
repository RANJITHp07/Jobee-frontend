'use client'
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import Users from '../components/users';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
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
import { chatMessage, sendMessage, uploadmedia } from '@/apis/chat';
import { getPhoto, uploadlogo } from '@/apis/company';
import { closeModal, openModal, setRoomId } from '@/redux/features/modal-slice';


function Page() {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const open: boolean = useAppSelector((state) => state.modalReducer.value.open);
  const token:string=useAppSelector((state)=>state.authReducer.value.token)
  const roomId:number=useAppSelector((state)=>state.modalReducer.value.roomId)
  const [typing, setTyping] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [id, setId] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [receiverId, setReceiverId] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef<Socket | null>();
  const [message, setMessage] = useState<any>([]);
  const [image, setImage] = useState('');
  const scrollRef = useRef<any>();
  const router = useRouter();
  const [showEmojii,setshowemojii]=useState(false)
  const [online,getonline]=useState([])
  const [username,setusername]=useState('')
  const [type,settype]=useState('')
   const [isModelOpen,setIsModalOpen]=useState(false)
   const [file,setfile]=useState<File | null>(null)
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [typingTimeout, settypingTimeout] = useState<any>(null);
  const dispatch=useDispatch()
  const [url,setImageUrl]=useState<any>([])

  //to add emojii
  const addEmoji = (e:any) => {
    const sym = e.unified.split("_");
    const codeArray:any = [];
    sym.forEach((el:any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setNewMessage((prev)=>prev+emoji)
  };

  //to generate a random number
  const generateRandomNumber = (min: number, max: number) => {
    const randomValue = Math.random() * (max - min) + min;
    const roundedRandomNumber = Math.floor(randomValue) * 1000;
    return roundedRandomNumber;
  };

  

  //to handle the typing
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

  //to send the message
  const handleSendmessage = async () => {
    try {
      if (newMessage.trim() !== '' && socket.current && id) {
        const u=online.some((p:any)=>p.userId===receiverId);
        if(!u){
               
        }

        socket.current.emit('sendMessage', { senderId: userId, receiverId: receiverId, text: newMessage });
        const res = await sendMessage(id,userId,'chat',newMessage,token)
        
        setNewMessage('');
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      throw err;
    }
  }

  const handlePhoto=(e:ChangeEvent<HTMLInputElement>)=>{
    try{
      if(e.target.files){

      
      const selectedFile =e.target.files[0] as File
      

      setfile(e.target.files[0] as File) 
      
      if (selectedFile) {
        setIsModalOpen(true)
        const fileType = selectedFile.type;

        if (fileType.startsWith('image/')) {
           settype("image")
        } else if (fileType === 'application/pdf') {
           settype("pdf")
        }else {
          message.info("Not supported type")
        }
        
  }
  
        }
      }catch(err){
        throw err
       }
      
    }

    //to handle upload
    const handleUpload=async()=>{
      const formData = new FormData();
      
      if(file){
        formData.append('file', file);
        let response=await uploadlogo(formData);
        
        setMessage((prev:any)=>[...prev,{
          conversationId:id,
          sender:userId,
          text:{
            text:response.data,
            type:type
          }
          
       }])
      
        id && await sendMessage(
          id,userId,type,response?.data,token
      )
      if(socket.current){
        socket?.current.emit('sendMessage', { senderId: userId, receiverId:receiverId , text:response.data });
      
        setNewMessage('');
        
      
     
      }
       
    setIsModalOpen(false)
    }
  }

    //to get the urls
    useEffect(() => {
      const fetchMessageUrls = async () => {
        const imageUrlPromises = message.map(async (p:any) => {
          if (p.text.type === 'image' || p.text.type==='pdf') {
                 const res= await getPhoto(p.text.text)
            return res?.data ;
          }
          return null; 
        });
    
        const resolvedUrls = await Promise.all(imageUrlPromises);
       
        setImageUrl(resolvedUrls);
      };
    
      fetchMessageUrls();
    }, [message]);
    
  

    //to accept the incoming
  useEffect(() => {



    socket.current = io('wss://www.jobeee.website');


    socket.current.on('getMessage', (data) => {
      console.log("message revieved")
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setNewMessage('') ;
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
        
      });
    }
  }, [userId, socket.current]);

  const handleVediocall = async () => {
    try {
      const newRandomNumber = generateRandomNumber(1, 100000000);
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
        dispatch(openModal(true))
        dispatch(setRoomId(data.text));
      });
    }
  }, [userId, socket,open,roomId]);

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
      <Modal open={open}  onOk={handleOk} footer={null} onCancel={()=>dispatch(closeModal(false))}>
          <p>Do you want to pick up the vedio call</p>
          <div className='flex justify-end mt-5'>
             <button className='border-2 p-1 px-2 rounded-lg hover:border-red-200' onClick={()=>dispatch(closeModal(false))}>
              Cancel
             </button>
             <button className='bg-blue-600 p-1 px-3  ml-3 rounded-lg  text-white hover:px-5 ' onClick={handleOk}>
              OK
             </button>
          </div>
      </Modal>
      <div className='bg-indigo-950 p-3  lg:hidden'>
              <p className='text-white '>{username}</p>
              {id && <p className='text-white text-xs online'>{id in online ? "Online" : "Offline"}</p>}
            </div>
      {showFilter && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex bg-black bg-opacity-50 z-50">
          <Users setShowFilter={setShowFilter} userId={userId} setid={setId} setrecieverId={setReceiverId} setusername={setusername}/>
        </div>
      )}
      <div className="lg:flex bg-[url('/wallpaper.jpg')] w-screen">
        <div className="hidden lg:block lg:w-1/4 h-1/2">
          <Users setShowFilter={setShowFilter} userId={userId} setid={setId} setrecieverId={setReceiverId}  setusername={setusername}/>
        </div>
        <button
          className="z-0 relative bg-indigo-950 text-white font-bold px-2 py-1 m-2 rounded-xl lg:hidden"
          onClick={() => setShowFilter(true)}
        >
          Users
        </button>
        <div className="w-screen ">
        <div className='bg-indigo-950 p-3 hidden lg:block'>
              <p className='text-white '>{username}</p>
              {id && <p className='text-white text-xs online'>{id in online ? "Online" : "Offline"}</p>}
            </div>
       
          <div className="overflow-y-auto h-screen lg:h-full m-3">
            
            { message.length>0 ? message.map((p: any, index: number) => (
              <div
                key={index}
                className={`message ${
                  p.sender === userId ? 'justify-end ' : 'justify-start w-1/2'
                }`}
              >
                {p.text.type === 'chat' ? (
                  <div className={p.sender === userId ? 'flex justify-end ' : 'flex justify-start '}>
                    
                  <div className= {p.text.text.length >50 ? "bg-indigo-950 text-white text-sm rounded-lg p-3 my-2 w-1/2" : "bg-indigo-950 text-white text-sm rounded-lg p-3 my-2 "}>
                    <p className=" text-white text-sm rounded-lg inline p-3">{p.text.text}</p>
                  
                  </div>
                  </div>
                  
                ) : (  p.text.type ==='image' ? 
                  <div className={p.sender === userId ? 'flex justify-end' : 'flex justify-start w-1/2'}>
                    <a href={url[index]} target="_blank" rel="noopener noreferrer" >
                    <Image
                      src={url[index]}
                      width={200}
                      height={100}
                      alt=""
                      className='m-3'
                    />
                    </a>
                  </div> :
                  (
                    p.text.type==='vedio' ?
                    <div className={p.sender === userId ? 'flex justify-end my-3' : 'flex justify-start w-1/2 my-3'}>
                    
                    <video src={url[index]} controls  className="my-3 h-32 w-32 md:h-72 md:w-72 mx-3 rounded-lg" />
                 
                  </div>
                   
                    :  <>
                    <div className={p.sender === userId ? 'flex justify-end my-3' : 'flex justify-start w-1/2 my-3'}>
                    
                    <a href={url[index]} target="_blank" rel="noopener noreferrer" className='inline border-2'>
                     <div className='border-4 border-slate-400'>
                     <img src={"/pdf.jpg"} alt='img' className=' h-32 w-36 '/>
                     <p className='bg-slate-400 text-white'>{p.text.text.slice(0,10)+"pdf"}</p>
                     </div>
                    
                    </a>
                 
                  </div>
                  
                  </>
                  )
                  
                
                )}  
                <div ref={scrollRef}></div> 
              </div>
            )):<p className=" text-2xl md:text-8xl my-16 mx-32 font-bold text-slate-200">Open a message</p>
          }
            {typing && (
              <p className="bg-indigo-950 inline text-white text-sm rounded-lg p-3 my-3">
                Typing...
              </p>
            )}
          </div>
          <Modal  open={isModelOpen} footer={null} onCancel={()=>{setIsModalOpen(false)}}>
            {
                type==='pdf' ?(file && <img src={"/pdf.jpg"} alt='img' className='my-3 h-96 w-96 mx-auto'/>) :
                (file && <img src={URL.createObjectURL(file)} alt='img' className='my-3 h-96 w-96 mx-auto'/>)
              }
              <button className='p-2 w-full bg-blue-500 text-white' onClick={()=>handleUpload()}>Send</button>
            </Modal>
          <div className=" rounded-full box_shadow p-3 w-11/12 lg:w-11/12 ml-3 md:ml-7  mx-auto my-3 bg-white">
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
                  accept=".pdf, image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handlePhoto(e)}
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

export default Page
