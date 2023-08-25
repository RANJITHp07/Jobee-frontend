'use client'
import React,{useEffect,useState,useRef} from 'react'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getReviews, postReviews } from '@/api/company';
import { useAppSelector } from '@/redux/store';
import {  Modal,Rate, message} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { deletereview, savecomment } from '@/api/review';
import { getUser } from '@/api/auth';

function ReviewPage({id,page}:{id:string,page:boolean}) {

  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const token=useAppSelector((state)=>state.authReducer.value.token)
  const[ratingid,setratingid]=useState('')
  const[user,setuser]=useState<any>()
  const [getreview,setgetreview]=useState<any>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [rating, setRating] = useState<number | undefined>(2);
  const review = useRef<HTMLTextAreaElement>(null);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const showDeleteConfirm:any= (index:number) => {
    Modal.confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
       const res= await deletereview(id,index,token)
       setgetreview(res.data.review)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleOk = async() => {
    if(review.current && rating)
    await postReviews(id,user?.username,review.current?.value,rating,token)
    if(!getreview){
      setgetreview([{username:user.username,comment:review.current?.value,rating:rating}])
    }else{
      setgetreview((prev:any)=>[...prev,{username:user.username,comment:review.current?.value,rating:rating}])
    }
    
    setIsModalOpen(false);

  };

  const handleComment=async(index:number)=>{
      try{
          if(review.current && rating){
            const res=await savecomment(id,index,review?.current?.value,rating,token)
            setgetreview(res.data.review)
            setIsModalOpen1(false)
          }
      }catch(err){
        throw err
      }
  }
 

   
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  useEffect(()=>{
    const fetchData=async()=>{
      if(userId){
        const res=await getUser(userId,token)
        console.log(res.data);
        setuser(res.data)
      }
    }
    fetchData()
  },[userId])

  useEffect(()=>{
     const fetchData=async()=>{
        const res=await getReviews(id,token)
        
        res.data && console.log(res.data.review)
        res.data && setgetreview(res.data.review)
        
     }
     fetchData()
  },[])
  return (
    <div className={!page ?'box_shadow rounded-lg p-3   lg:w-full lg:mx-auto md:w-full':'box_shadow rounded-lg p-3   lg:w-10/12 lg:mx-auto md:w-full my-3'} id="review">
        <div className='flex justify-between mb-3'>
        <p className='font-bold text-slate-500'>Reviews</p>
        {
           page &&   <button className='bg-indigo-950 text-white p-2 rounded-lg' onClick={() => {  userId ? setIsModalOpen(true) : message.info("Please Login") }}>Add Review</button>
        }
        { !page && (
         !getreview && <p className='text-sm font-medium flex justify-end text-slate-500 '>No reviews</p>
        )
        }
        </div>
        <hr/>
        {
          getreview && 
          getreview.map((p:any,index:number)=>{
            return (
              <div className='my-3 bg-slate-100 p-4 rounded-lg'>
              <div className='flex justify-between my-3'>
                 <div className='flex items-center'>
                 <Image src={'/person.webp'} width={30} height={30} alt='profile' className='rounded-full mx-1'/>
                 <div className=' mx-2'>
                 <p className='text-sm'>{p.username}</p>
                 <div className='flex items-center '><p className='text-xs'>{p.rating}</p><p className='text-xs'><StarIcon className='text-xs text-yellow-300'/></p></div>
                  </div>
                 </div>
                 {
                  page && <div className='flex'>
                  <DeleteIcon className='mx-2 cursor-pointer' onClick={()=>{ userId ? showDeleteConfirm(index) : message.info("Please Login")}} />
                  <EditIcon
  className='cursor-pointer'
  onClick={() => {
    if (userId) {
      setIsModalOpen1(true);
      setratingid(p._id);
    } else {
      message.info("Please Login");
    }
  }}
/>
               </div>
                 }
                  {p._id===ratingid && <Modal title="Share your Review" open={isModalOpen1} onOk={()=>handleComment(index)} onCancel={()=>setIsModalOpen1(false)}>
         <textarea className='border-2 w-full h-32 p-2 rounded-md my-3' placeholder='Share your opinon' defaultValue={p.comment} ref={review}></textarea>
         <p>Rate your Opinon</p>
         <Rate onChange={handleRatingChange} defaultValue={p.rating} /> 
      </Modal>}
              </div>
              <p className='text-sm'>{p.comment}</p>
              
          </div>
            )
          })
        }
        <Modal title="Share your Review" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <textarea className='border-2 w-full h-32 p-2 rounded-md my-3' placeholder='Share your opinon' ref={review}></textarea>
         <p>Rate your Opinon</p>
         <Rate onChange={handleRatingChange} defaultValue={2} /> 
      </Modal>
    </div>
  )
}

export default ReviewPage